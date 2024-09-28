"use client";

import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCustomSession } from "@/hooks/session";
import EnhancedProgressBar from "@/components/EnhancedProgressBar";
import UploadButton from "@/components/UploadButton";
import Toast from "@/components/Toast"; // Import the Toast component

interface Link {
  title: string;
  url: string;
}

function Page() {
  const [links, setLinks] = useState<Link[]>([{ title: "", url: "" }]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showToast, setShowToast] = useState(false); // State to manage toast visibility
  const [toastMessage, setToastMessage] = useState(""); // State for toast message
  const { session, isLoggedIn } = useCustomSession();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("/api/user", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = res.data;
        setUserId(data.user.id);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, [session, isLoggedIn]);

  const handleAddLink = () => {
    setLinks([...links, { title: "", url: "" }]);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setUploadProgress(0);
    if (!videoFile) {
      setToastMessage("Please select a video");
      setShowToast(true);
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
      await axios.post("/api/video/upload-video", formData, {
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

      setToastMessage("Tutorial upload successful!");
      setShowToast(true);
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 1000);
    } catch (error) {
      console.error("Upload failed:", error);
      setToastMessage("Upload failed. Please try again.");
      setShowToast(true);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleChange = (index: number, field: keyof Link, value: string) => {
    const updatedLinks = [...links];
    updatedLinks[index][field] = value;
    setLinks(updatedLinks);
  };

  const handleDeleteLink = (index: number) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <div className="p-4 sm:ml-64 bg-[#212121] h-screen">
      <form
        onSubmit={handleUpload}
        className="flex flex-col gap-5 max-w-sm mx-auto h-[89vh] justify-center text-white"
      >
        <h1 className="text-center text-xl font-semibold mb-4">
          Tutorial Upload Form
        </h1>
        <div className="mb-4 flex flex-col">
          <label className="block mb-3 text-sm font-medium text-white">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="mb-3 text-sm font-medium text-white block">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 w-full"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="mb-3 text-sm font-medium text-white">Links</label>
          {links.map((link, index) => (
            <div key={index} className="grid grid-cols-8 gap-4 w-full mb-3">
              <input
                type="text"
                placeholder="Link name (e.g., GitHub, Instagram)"
                className="p-2.5 rounded-lg text-gray-900 border border-gray-300 text-sm focus:border-blue-500 w-full col-span-2"
                value={link.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
              />
              <input
                type="text"
                placeholder="Link URL"
                className="p-2.5 rounded-lg text-gray-900 border border-gray-300 text-sm focus:border-blue-500 w-full col-span-5"
                value={link.url}
                onChange={(e) => handleChange(index, "url", e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleDeleteLink(index)}
                className="col-span-1 flex bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors justify-center items-center"
              >
                <Trash2 />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddLink}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Link
          </button>
        </div>
        <div className="mb-4 flex flex-col">
          <label className="mb-2 text-sm text-white font-medium">
            Upload video
          </label>
          <input
            accept="video/*"
            type="file"
            onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            className="block w-full text-md border border-gray-600 text-gray-400 rounded-lg cursor-pointer bg-gray-800 focus:outline-none placeholder-gray-800"
          />
        </div>
        {uploading && (
          <EnhancedProgressBar
            progress={uploadProgress}
            isUploading={uploading}
          />
        )}
        <UploadButton uploading={uploading} />
      </form>
      {showToast && (
        <Toast
          message={toastMessage}
          duration={3000}
          onClose={handleToastClose}
          show={showToast}
        />
      )}
    </div>
  );
}

export default Page;
