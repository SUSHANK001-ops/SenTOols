// components/PdfConverter/shared/FileUpload.js
'use client';
import { useState } from 'react';
import { Upload } from 'lucide-react';

export default function FileUpload({ onFileSelect }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center p-8 mt-2 border-2 border-dashed rounded-lg ${
        dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <Upload className="w-12 h-12 mb-4 text-gray-400" />
      <p className="mb-2 text-sm text-gray-600">
        Drag and drop your PDF file here, or click to select
      </p>
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleChange}
        accept=".pdf"
      />
    </div>
  );
}
