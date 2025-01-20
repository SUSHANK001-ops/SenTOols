// components/PdfConverter/DocConverter/DocForm.js
'use client';
import { useState } from 'react';
import FileUpload from '../shared/FileUpload';
import ConversionProgress from '../shared/ConversionProgress';
import DownloadButton from '../shared/DownloadButton';

export default function DocForm() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [convertedFile, setConvertedFile] = useState(null);
  const [error, setError] = useState(null);

  const handleConvert = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/pdf/convert-to-doc', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Conversion failed');

      const data = await response.json();
      setConvertedFile(data.url);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Convert PDF to DOC</h2>
      <FileUpload onFileSelect={setFile} />
      {file && !convertedFile && (
        <button
          onClick={handleConvert}
          className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Convert to DOC
        </button>
      )}
      {progress > 0 && progress < 100 && (
        <ConversionProgress progress={progress} />
      )}
      {convertedFile && (
        <DownloadButton url={convertedFile} filename="converted.doc" />
      )}
      {error && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}