
import React from "react";

export interface FileType {
  id: number;
  filename: string;
  originalName: string;
  filetype: string;
  fileSize: number;        // in bytes
  downloadUrl: string;     // direct link to download/view
  imageUrl: string | null; // thumbnail URL (if any)
  // ...other fields
}

interface Props {
  file: FileType;
}

const File: React.FC<Props> = ({ file }) => {
  // Format bytes → KB/MB
  const fmtSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 ** 2) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1024 ** 2).toFixed(1) + " MB";
  };

  // Card click handler: open in new tab
  const openFile = () => {
    window.open(file.downloadUrl, "_blank", "noopener");
  };

  // Determine what to render in preview area
  const Preview = () => {
    if (file.imageUrl) {
      // real thumbnail
      return (
        <img
          src={file.imageUrl}
          alt={file.originalName}
          className="object-cover w-full h-full rounded"
        />
      );
    } else if (file.filetype === "application/pdf") {
      // PDF icon
      return <span className="text-6xl">📄</span>;
    } else {
      // generic file icon
      return <span className="text-6xl">📁</span>;
    }
  };

  return (
    <div
      onClick={openFile}
      className="cursor-pointer bg-gray-600 rounded-lg shadow p-3 flex flex-col items-center hover:bg-gray-500 transition"
    >
      <div className="w-full h-32 mb-2 flex items-center justify-center bg-gray-500 rounded overflow-hidden">
        <Preview />
      </div>
      <h2 className="text-sm font-medium truncate text-center">
        {file.originalName}
      </h2>
      <p className="text-xs text-gray-300 mt-1">{fmtSize(file.fileSize)}</p>
    </div>
  );
};

export default File;
