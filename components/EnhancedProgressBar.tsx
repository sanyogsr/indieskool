import React from "react";

const EnhancedProgressBar = ({
  progress,
  isUploading,
}: {
  progress: number;
  isUploading: boolean;
}) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-6 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            {isUploading && progress < 100
              ? "Uploading..."
              : progress === 100
              ? "Complete!"
              : `${progress}%`}
          </span>
        </div>
      </div>
      {isUploading && progress < 100 && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-end pr-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default EnhancedProgressBar;
