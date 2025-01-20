// app/components/PdfConverter/ExcelConverter/ExcelForm.js
import React, { useState } from 'react';
import { File, AlertCircle } from 'lucide-react';

export default function ExcelForm() {
  const [file, setFile] = useState(null);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile?.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid PDF file');
    }
  };

  const handleConversion = async () => {
    try {
      setConverting(true);
      setProgress(10);
      
      const formData = new FormData();
      formData.append('file', file);

      setProgress(30);
      
      const response = await fetch('/api/pdf/convert-to-excel', {
        method: 'POST',
        body: formData,
      });

      setProgress(70);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Conversion failed');
      }

      setProgress(90);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      setProgress(100);

      // Trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'converted.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup
      window.URL.revokeObjectURL(url);
      setFile(null);
      setProgress(0);
    } catch (err) {
      setError(err.message);
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Convert PDF to Excel</h2>
        <p className="mt-2 text-gray-600">Upload your PDF file to convert it to Excel format</p>
      </div>

      <div className="space-y-4">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <File className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PDF (max. 10MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept=".pdf"
            onChange={handleFileSelect}
          />
        </label>

        {error && (
          <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {file && (
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
            <div className="flex items-center gap-2">
              <File className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">{file.name}</span>
            </div>
            <span className="text-sm text-gray-500">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </span>
          </div>
        )}

        {progress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              {progress}% Complete
            </p>
          </div>
        )}

        <button
          onClick={handleConversion}
          disabled={!file || converting}
          className={`w-full py-2 px-4 rounded ${
            !file || converting
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white transition-colors`}
        >
          {converting ? 'Converting...' : 'Convert to Word'}
        </button>
      </div>
    </div>
  );
}