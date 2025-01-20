// components/PdfConverter/shared/DownloadButton.js
export default function DownloadButton({ url, filename }) {
  return (
    <a
      href={url}
      download={filename}
      className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
    >
      Download Converted File
    </a>
  );
}