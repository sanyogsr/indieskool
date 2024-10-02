"use client";

import React, { useEffect, useState, useRef } from "react";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { useCustomSession } from "@/hooks/session";
import Toast from "@/components/Toast";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UploadButton from "@/components/UploadButton";

// Snake game component
const SnakeGame: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [dir, setDir] = useState({ x: 1, y: 0 });

  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gameLoop = setInterval(() => {
      // Move snake
      const newSnake = [...snake];
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

      // Check if snake eats food
      if (head.x === food.x && head.y === food.y) {
        newSnake.unshift(head);
        setFood({
          x: Math.floor(Math.random() * 20),
          y: Math.floor(Math.random() * 20),
        });
      } else {
        newSnake.unshift(head);
        newSnake.pop();
      }

      // Check collision with walls
      if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
        clearInterval(gameLoop);
        return;
      }

      setSnake(newSnake);

      // Draw
      ctx.clearRect(0, 0, 400, 400);
      ctx.fillStyle = "green";
      snake.forEach((segment) => {
        ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
      });
      ctx.fillStyle = "red";
      ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
    }, 100);

    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          setDir({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          setDir({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          setDir({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          setDir({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      clearInterval(gameLoop);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isPlaying, snake, food, dir]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      className="border border-gray-600 bg-black rounded-lg"
    />
  );
};

// Zod schemas
const linkSchema = z.object({
  title: z.string().min(1, "Link title is required"),
  url: z.string().url("Invalid URL"),
});

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  links: z.array(linkSchema).min(1, "At least one link is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
});

type FormData = z.infer<typeof formSchema>;

// Custom UploadButton component

function Page() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [userId, setUserId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isPlayingSnake, setIsPlayingSnake] = useState(false);
  const { session, isLoggedIn } = useCustomSession();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      links: [{ title: "", url: "" }],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("/api/user", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUserId(res.data.user.id);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, [session, isLoggedIn]);

  const onSubmit = async (data: FormData) => {
    if (!videoFile) {
      setToastMessage("Please select a video");
      setShowToast(true);
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setIsPlayingSnake(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("video", videoFile);
    formData.append("userId", userId);
    formData.append("price", data.price);
    data.links.forEach((link, index) => {
      formData.append(`links[${index}].title`, link.title);
      formData.append(`links[${index}].url`, link.url);
    });
    formData.append("linksLength", data.links.length.toString());

    try {
      await axios.post("/api/video/upload-video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setUploadProgress(percentCompleted);
        },
      });

      setToastMessage("Tutorial upload successful!");
      setShowToast(true);
    } catch (error) {
      console.error("Upload failed:", error);
      setToastMessage("Upload failed. Please try again.");
      setShowToast(true);
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setIsPlayingSnake(false);
    }
  };

  return (
    <div className="p-4 sm:ml-64 bg-gradient-to-b from-[#212121] to-[#121212] min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 max-w-md w-full bg-[#2a2a2a] p-8 rounded-xl shadow-lg relative overflow-hidden"
      >
        <h1 className="text-center text-2xl font-bold mb-6 text-white">
          Tutorial Upload Form
        </h1>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-white">
            Title
          </label>
          <input
            {...register("title")}
            className="w-full p-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          />
          {errors.title && (
            <p className="mt-1 text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-white">
            Description
          </label>
          <textarea
            {...register("description")}
            className="w-full p-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          />
          {errors.description && (
            <p className="mt-1 text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-white">
            Links
          </label>
          {fields.map(
            (field: { id: React.Key | null | undefined }, index: number) => (
              <div
                key={field.id}
                className="grid grid-cols-8 gap-4 w-full mb-3 animate-fadeIn"
              >
                <input
                  {...register(`links.${index}.title`)}
                  placeholder="Link name"
                  className="col-span-2 p-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
                <input
                  {...register(`links.${index}.url`)}
                  placeholder="Link URL"
                  className="col-span-5 p-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="col-span-1 flex bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors justify-center items-center"
                >
                  <Trash2 />
                </button>
              </div>
            )
          )}
          {errors.links && (
            <p className="mt-1 text-red-500">{errors.links.message}</p>
          )}
          <button
            type="button"
            onClick={() => append({ title: "", url: "" })}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Link
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-white">
            Price
          </label>
          <input
            {...register("price")}
            placeholder="Enter price"
            className="w-full p-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          />
          {errors.price && (
            <p className="mt-1 text-red-500">{errors.price.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-white">
            Upload video
          </label>
          <input
            accept="video/*"
            type="file"
            onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-400 bg-gray-700 rounded-lg cursor-pointer focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-all duration-300"
          />
        </div>

        {uploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-center">
              <p className="mb-4">Uploading... {uploadProgress}%</p>
              <SnakeGame isPlaying={isPlayingSnake} />
              <p className="mt-4">Play Snake while you wait!</p>
              <p className="text-sm">Use arrow keys to control the snake</p>
            </div>
          </div>
        )}

        <UploadButton
          uploading={uploading}
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid || !videoFile}
        />
      </form>

      {showToast && (
        <div className="fixed bottom-4 right-4 animate-fadeIn">
          <Toast
            message={toastMessage}
            duration={3000}
            onClose={() => setShowToast(false)}
            show={showToast}
          />
        </div>
      )}
    </div>
  );
}

export default Page;
