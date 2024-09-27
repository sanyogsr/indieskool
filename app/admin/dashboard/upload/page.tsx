"use client";

import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCustomSession } from "@/hooks/session";
import EnhancedProgressBar from "@/components/EnhancedProgressBar";
interface Link {
  title: string;
  url: string;
}
function Page() {
  const [links, setLinks] = useState<Link[]>([{ title: "", url: "" }]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState(""); // Add userId state
  const [uploading, setUploading] = useState(false); // Add userId state
  const [uploadProgress, setUploadProgress] = useState(0);
  const { session, isLoggedIn } = useCustomSession();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("hii");
        const res = await axios.get("/api/user", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Axios automatically throws an error for non-2xx status codes
        const data = res.data; // Axios response data is in `data`
        console.log("upload file user id", userId);
        setUserId(data.user.id);

        // Check user role and redirect accordingly
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, [session, isLoggedIn]); // Add all dependencies

  const handleAddLink = () => {
    setLinks([...links, { title: "", url: "" }]);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setUploadProgress(0);
    if (!videoFile) {
      alert("Please select a video");
      setUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", videoFile);
    formData.append("userId", userId);
    links.forEach((link, index) => {
      formData.append(`links[${index}].title`, link.title);
      formData.append(`links[${index}].url`, link.url);
    });
    formData.append("linksLength", links.length.toString());

    try {
      const response = await axios.post("/api/video/upload-video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total || 0;
          const current = progressEvent.loaded || 0;
          const percentCompleted = Math.round((current * 100) / total);
          setUploadProgress(percentCompleted);
        },
      });

      console.log("Tutorial upload successful..!");
      setUploadProgress(100); // Ensure this is set after successful upload
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 1000);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // const handleUpload = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setUploading(true);
  //   setUploadProgress(0);
  //   if (!videoFile) {
  //     alert("Please select a video");
  //     setUploading(false);

  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("title", title);
  //   formData.append("description", description);
  //   formData.append("video", videoFile);
  //   formData.append("userId", userId);
  //   links.forEach((link, index) => {
  //     formData.append(`links[${index}].title`, link.title);
  //     formData.append(`links[${index}].url`, link.url);
  //   });
  //   formData.append("linksLength", links.length.toString());

  //   try {
  //     const response = await axios.post("/api/video/upload-video", formData, {
  //       headers: {
  //         "Content-Type": "multiport/form-data",
  //       },
  //       onUploadProgress: (progressEvent) => {
  //         const total = progressEvent.total || 0;
  //         const current = progressEvent.loaded || 0;
  //         const percentCompleted = Math.round((current * 100) / total);
  //         console.log(
  //           `Total: ${total}, Current: ${current}, Percent: ${percentCompleted}`
  //         );

  //         setUploadProgress(percentCompleted);
  //       },
  //     });
  //     console.log("tutorial upload successful..!");
  //     setUploadProgress(100);
  //     setTimeout(() => {
  //       setUploading(false);
  //       setUploadProgress(0);
  //     }, 1000);
  //   } catch (error) {
  //     console.error("Upload failed:", error);
  //     setUploading(false);
  //     setUploadProgress(0);
  //   }
  // };

  const handleChange = (index: number, field: keyof Link, value: string) => {
    const updatedLinks = [...links];
    updatedLinks[index][field] = value;
    setLinks(updatedLinks);
  };
  const handleDeleteLink = (index: number) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };
  return (
    <div className="p-4 sm:ml-64 bg-[#212121] h-screen  ">
      <form
        onSubmit={handleUpload}
        className="flex flex-col gap-5 max-w-sm mx-auto h-[89vh] justify-center text-white"
      >
        {" "}
        <h1 className="text-center text-xl font-semibold mb-4  ">
          Tutorial Upload Form
        </h1>
        <div className="mb-4 flex flex-col ">
          <label
            htmlFor=""
            className="block mb-3 text-sm font-medium text-white"
          >
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 "
          />
        </div>
        <div className="mb-4 flex flex-col ">
          <label
            htmlFor=""
            className="mb-3 text-sm font-medium text-white block"
          >
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 w-full  "
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="" className="mb-3 text-sm font-medium text-white">
            Links
          </label>
          {links.map((link, index) => (
            <div key={index} className="grid grid-cols-8 gap-4 w-full mb-3">
              {/* Link Name Input */}
              <input
                type="text"
                placeholder="Link name (e.g., GitHub, Instagram)"
                className="p-2.5 rounded-lg text-gray-900 border border-gray-300 text-sm focus:border-blue-500 w-full col-span-2"
                value={link.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
              />
              {/* Link URL Input */}
              <input
                type="text"
                placeholder="Link URL"
                className="p-2.5 rounded-lg text-gray-900 border border-gray-300 text-sm focus:border-blue-500 w-full col-span-5"
                value={link.url}
                onChange={(e) => handleChange(index, "url", e.target.value)}
              />
              {/* Delete Button */}
              <button
                type="button"
                onClick={() => handleDeleteLink(index)}
                className="col-span-1 flex bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors justify-center items-center"
              >
                <Trash2 />
              </button>
            </div>
          ))}
          {/* Add Link Button */}
          <button
            type="button"
            onClick={handleAddLink}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Link
          </button>
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="" className=" mb-2 text-sm text-white font-medium">
            Upload video
          </label>
          <input
            accept="video/*"
            type="file"
            onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            className="block w-full text-md border border-gray-600 text-gray-400 rounded-lg cursor-pointer bg-gray-800 focus:outline-none placeholder-gray-800  "
          />
        </div>
        {/* Submit Button */}
        {uploading && (
          <EnhancedProgressBar
            progress={uploadProgress}
            isUploading={uploading}
          />
        )}
        <button
          type="submit"
          className="px-4 bg-blue-500 hover:bg-yellow-700 text-white focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm flex justify-center items-center py-2.5"
        >
          {uploading ? "Uploading..." : "Upload tutorial"}
        </button>
      </form>
    </div>
  );
}

export default Page;
// Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, autem necessitatibus. Earum eum quia saepe magni excepturi veniam doloribus nemo, ipsum accusantium. Expedita facere deleniti quasi dolorum! Repellendus quisquam modi exercitationem corrupti voluptatibus ea cumque obcaecati facilis iure esse praesentium tenetur vel itaque, dignissimos officiis eligendi sapiente deleniti labore? Aliquid eum pariatur impedit fuga. Cupiditate doloremque porro libero, non sint quibusdam consectetur illum asperiores temporibus tenetur. Voluptatibus sed aspernatur optio totam commodi nesciunt reprehenderit itaque! Impedit, corrupti. Recusandae!
