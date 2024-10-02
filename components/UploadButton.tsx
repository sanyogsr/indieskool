"use client";
import React, { useEffect, useRef, useState } from "react";

interface UploadButtonProps {
  uploading: boolean; // Indicates if uploading is in progress
  initialText?: string; // Initial button text (optional)
  uploadingText?: string; // Text to show during upload (optional)
  successText?: string; // Text to show after success (optional)
  initialBgColor?: string; // Initial background color (optional)
  uploadingBgColor?: string; // Background color during upload (optional)
  successBgColor?: string; // Background color after success (optional)
  hoverColor?: string; // Hover color when not uploading (optional)
}

const UploadButton: React.FC<{
  uploading: boolean;
  onClick: () => void;
  disabled: boolean;
}> = ({ uploading, onClick, disabled }) => {
  const [success, setSuccess] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!uploading && success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [uploading, success]);

  const handleClick = () => {
    if (!uploading && !disabled) {
      onClick();
      setSuccess(true);
    }
  };

  const buttonText = uploading
    ? "Uploading..."
    : success
    ? "Uploaded Successfully"
    : "Upload Tutorial";
  const buttonClass = `px-4 py-2.5 rounded-lg text-white font-medium text-sm transition-all duration-300 ${
    uploading
      ? "bg-blue-700"
      : success
      ? "bg-green-500"
      : disabled
      ? "bg-gray-500 cursor-not-allowed"
      : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
  }`;

  return (
    <button
      ref={buttonRef}
      type="submit"
      className={buttonClass}
      disabled={uploading || disabled}
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
};
export default UploadButton;
