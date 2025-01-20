// components/PdfConverter/shared/ConversionProgress.js
export default function ConversionProgress({ progress }) {
  return (
    <div className="w-full mt-4">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-center text-gray-600">
        Converting... {progress}%
      </p>
    </div>
  );
}
