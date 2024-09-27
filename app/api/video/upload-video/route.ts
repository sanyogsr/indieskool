// import { NextResponse } from "next/server";
// import { promisify } from "util";
// import fs from "fs";
// import multer from "multer";
// import path from "path";
// import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// const TEMP_DIR = path.join(process.cwd(), "tmp");
// const upload = multer({ dest: TEMP_DIR });
// const uploadMiddleware = promisify(upload.single("video"));

// const s3 = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
// if (!fs.existsSync(TEMP_DIR)) {
//   fs.mkdirSync(TEMP_DIR, { recursive: true });
// }
// export async function POST(req: Request) {
//   try {
//     await new Promise((resolve, reject) => {
//       upload.single("video")(req as any, {} as any, (err) => {
//         if (err) return reject(err);
//         resolve(null);
//       });
//     });

//     const form = new FormData();
//     const body = await req.formData();
//     const title = body.get("title")?.toString();
//     const description = body.get("description")?.toString();
//     const videoFile = body.get("video") as File;
//     const userId = body.get("userId")?.toString();
//     if (!videoFile) {
//       return NextResponse.json(
//         { error: "No video file is provided" },
//         { status: 400 }
//       );
//     }
//     const linksLength = parseInt(
//       body.get("linksLength")?.toString() || "0",
//       10
//     );

//     const links: { title: string; url: string }[] = [];

//     for (let i = 0; i < linksLength; i++) {
//       const linkTitle = body.get(`links[${i}].title`)?.toString();
//       const linkUrl = body.get(`links[${i}].url`)?.toString();
//       if (linkTitle && linkUrl) {
//         links.push({ title: linkTitle, url: linkUrl });
//       }
//     }

//     const tempFilePath = path.join(TEMP_DIR, videoFile.name);
//     const videoBuffer = Buffer.from(await videoFile.arrayBuffer());
//     fs.writeFileSync(tempFilePath, videoBuffer);

//     // upload the video to s3
//     const fileStream = fs.createReadStream(tempFilePath);
//     const uploadParams = {
//       Bucket: process.env.AWS_S3_BUCKET_NAME!,
//       Key: `video/${videoFile.name}`,
//       Body: fileStream,
//       ContentType: videoFile.type,
//     };

//     const command = new PutObjectCommand(uploadParams);
//     await s3.send(command);

//     const videoUrl = `${process.env.AWS_CLOUDFRONT_URL}/video/${videoFile.name}`;

//     // Save metadata and links to PostgreSQL database
//     const tutorial = await prisma?.tutorial.create({
//       data: {
//         title: title || "",
//         description: description || "",
//         videoUrl: videoUrl,
//         links: {
//           create: links,
//         },
//         user: {
//           connect: { id: userId },
//         },
//       },
//     });

//     // clean up the temp file uploading to s3
//     fs.unlinkSync(tempFilePath);

//     return NextResponse.json(
//       { message: "Video uploaded success fully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error in uploading video", error);
//     return NextResponse.json(
//       { error: "Failed to upload video" },
//       { status: 500 }
//     );
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    console.log("Bucket Name:", process.env.AWS_S3_BUCKET_NAME);
    console.log("AWS Region:", process.env.AWS_REGION);
    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const videoFile = formData.get("video") as File | null;
    const userId = formData.get("userId")?.toString();

    if (!videoFile) {
      return NextResponse.json(
        { error: "No video file is provided" },
        { status: 400 }
      );
    }

    const videoStream = videoFile.stream();
    const videoSize = videoFile.size;

    if (videoSize > 5 * 1024 * 1024) {
      await uploadLargeFileToS3(videoStream, videoFile);
    } else {
      await uploadFileToS3(videoStream, videoFile);
    }

    const videoUrl = `${process.env.AWS_CLOUDFRONT_URL}/video/${videoFile.name}`;

    const tutorial = await prisma?.tutorial.create({
      data: {
        title: title || "",
        description: description || "",
        videoUrl: videoUrl,
        links: {
          create: extractLinks(formData),
        },
        user: {
          connect: { id: userId },
        },
      },
    });

    return NextResponse.json(
      { message: "Video uploaded successfully" },
      { status: 200 }
    );
  } catch (error) {
    // alert(error);
    return NextResponse.json(
      { error: "Failed to upload video", err: error },
      { status: 500 }
    );
  }
}

async function streamToBuffer(stream: ReadableStream): Promise<Buffer> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let result: ReadableStreamReadResult<Uint8Array>;

  while (!(result = await reader.read()).done) {
    chunks.push(result.value);
  }

  return Buffer.concat(chunks);
}

async function uploadLargeFileToS3(
  videoStream: ReadableStream,
  videoFile: File
) {
  const partSize = 5 * 1024 * 1024; // 5MB per part
  const uploadId = await createMultipartUpload(videoFile);

  try {
    const parts: { PartNumber: number; ETag: string }[] = [];
    let partNumber = 1;
    const buffer = await streamToBuffer(videoStream);
    const totalParts = Math.ceil(buffer.length / partSize);

    for (let i = 0; i < totalParts; i++) {
      const partBuffer = buffer.slice(i * partSize, (i + 1) * partSize);

      const uploadPartCommand = new UploadPartCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: `video/${videoFile.name}`,
        PartNumber: partNumber,
        UploadId: uploadId,
        Body: partBuffer,
      });

      const { ETag } = await s3.send(uploadPartCommand);

      if (ETag) {
        parts.push({ PartNumber: partNumber, ETag });
      } else {
        throw new Error(
          `Failed to upload part ${partNumber}: ETag is undefined.`
        );
      }

      partNumber++;
    }

    await completeMultipartUpload(uploadId, parts, videoFile);
  } catch (error) {
    console.error("Error in multipart upload", error);
    throw error;
  }
}

async function uploadFileToS3(videoStream: ReadableStream, videoFile: File) {
  const buffer = await streamToBuffer(videoStream);

  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: `video/${videoFile.name}`,
    Body: buffer,
    ContentType: videoFile.type,
  };

  const command = new PutObjectCommand(uploadParams);
  await s3.send(command);
}

async function createMultipartUpload(videoFile: File): Promise<string> {
  const createUploadCommand = new CreateMultipartUploadCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: `video/${videoFile.name}`,
    ContentType: videoFile.type,
  });

  const { UploadId } = await s3.send(createUploadCommand);
  if (!UploadId) {
    throw new Error(
      "Failed to create multipart upload: UploadId is undefined."
    );
  }
  return UploadId;
}

async function completeMultipartUpload(
  uploadId: string,
  parts: { PartNumber: number; ETag: string }[],
  videoFile: File
) {
  const completeUploadCommand = new CompleteMultipartUploadCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: `video/${videoFile.name}`,
    UploadId: uploadId,
    MultipartUpload: { Parts: parts },
  });

  await s3.send(completeUploadCommand);
}

function extractLinks(formData: FormData): { title: string; url: string }[] {
  const linksLength = parseInt(
    formData.get("linksLength")?.toString() || "0",
    10
  );
  const links: { title: string; url: string }[] = [];

  for (let i = 0; i < linksLength; i++) {
    const linkTitle = formData.get(`links[${i}].title`)?.toString();
    const linkUrl = formData.get(`links[${i}].url`)?.toString();
    if (linkTitle && linkUrl) {
      links.push({ title: linkTitle, url: linkUrl });
    }
  }

  return links;
}
