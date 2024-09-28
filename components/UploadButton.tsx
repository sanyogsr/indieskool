import React from 'react';

interface UploadButtonProps {
  uploading: boolean;                 // Indicates if uploading is in progress
  initialText?: string;               // Initial button text (optional)
  uploadingText?: string;             // Text to show during upload (optional)
  successText?: string;               // Text to show after success (optional)
  initialBgColor?: string;            // Initial background color (optional)
  uploadingBgColor?: string;          // Background color during upload (optional)
  successBgColor?: string;            // Background color after success (optional)
  hoverColor?: string;                // Hover color when not uploading (optional)
}

const UploadButton: React.FC<UploadButtonProps> = ({
  uploading,
  initialText = 'Upload Tutorial',
  uploadingText = 'Uploading...',
  successText = 'Uploaded Successfully',
  initialBgColor = 'bg-blue-500',
  uploadingBgColor = 'bg-blue-700',
  successBgColor = 'bg-green-500',
  hoverColor = 'hover:bg-yellow-700',
}) => {
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    if (!uploading && success) {
      const timer = setTimeout(() => {
        setSuccess(false); // Reset success state after 2 seconds
      }, 2000);

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [uploading, success]);

  const buttonText = uploading
    ? uploadingText
    : success
    ? successText
    : initialText;

  const buttonBgColor = uploading
    ? uploadingBgColor
    : success
    ? successBgColor
    : `${initialBgColor} ${hoverColor}`;

  return (
    <button
      type="submit"
      className={`px-4 text-white focus:outline-none focus:ring-4 font-medium rounded-lg text-sm flex justify-center items-center py-2.5 transition-all duration-300 ${buttonBgColor}`}
      disabled={uploading} // Disable the button while uploading
      onClick={() => {
        if (!uploading) {
          // Trigger upload and set success to true after upload completes
          setSuccess(true); // Set success to true after successful upload
        }
      }}
    >
      {buttonText}
    </button>
  );
};

export default UploadButton;
