"use client";
import React, { useState, useRef, useEffect } from "react";
import { Download, Link as LinkIcon, QrCode, Loader2 } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRGenerator() {
  const [url, setUrl] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const qrRef = useRef(null);
  const [adContent, setAdContent] = useState("");

  const isAdEnvironment = typeof window !== "undefined" && window.location.hostname === "sushank.com.np";

  const generateQR = () => {
    if (!url) return;
    setIsGenerating(true);
    setTimeout(() => {
      setShowQR(true);
      setIsGenerating(false);
    }, 800);
  };

  const downloadQR = () => {
    if (!qrRef.current) return;
    setIsDownloading(true);

    setTimeout(() => {
      const canvas = qrRef.current;
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    }, 500);
  };

  useEffect(() => {
    if (isAdEnvironment) {
      setAdContent("Ad 1: Visit our store!");
      const adInterval = setInterval(() => {
        setAdContent((prevAd) =>
          prevAd === "Ad 1: Visit our store!"
            ? "Ad 2: Check out our new features!"
            : "Ad 1: Visit our store!"
        );
      }, 40000);

      const adTimeout = setTimeout(() => {
        setAdContent("");
      }, 5000);

      return () => {
        clearInterval(adInterval);
        clearTimeout(adTimeout);
      };
    }
  }, [isAdEnvironment]);

  return (
    <div className="relative min-h-screen p-8 transition-all duration-500">
      {/* Ad Area (Visible only in specific environment) */}
      {isAdEnvironment && adContent && (
        <div className="absolute inset-0 z-0 flex items-center justify-center transition-opacity duration-1000">
          <div className="bg-red-500 bg-opacity-50 text-white p-6 rounded-lg border-4 border-dashed border-white max-w-md mx-auto text-center">
            <p className="font-bold">Advertisement</p>
            <p>{adContent}</p>
          </div>
        </div>
      )}

      {/* QR Generator Area */}
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8 scale-100 hover:scale-105 transition-transform duration-300">
            <QrCode className="w-8 h-8 text-blue-600 animate-pulse" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              QR Code Generator
            </h1>
          </div>

          {/* Input Section */}
          <div className="relative mb-8 transform hover:-translate-y-1 transition-all duration-300">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LinkIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL here"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={generateQR}
            disabled={isGenerating || !url}
            className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mb-8 ${
              isGenerating ? "opacity-75 cursor-wait" : ""
            } transform hover:-translate-y-1 active:translate-y-0`}
          >
            {isGenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <QrCode className="w-5 h-5" />
            )}
            {isGenerating ? "Generating..." : "Generate QR Code"}
          </button>

          {/* QR Code Display */}
          {showQR && url && (
            <div className="flex flex-col items-center animate-fadeIn">
              <div className="bg-white p-6 rounded-lg shadow-lg mb-4 transform hover:scale-105 transition-all duration-300">
                <QRCodeCanvas
                  ref={qrRef}
                  value={url}
                  size={256}
                  level="H"
                  includeMargin={true}
                  className="mx-auto"
                />
              </div>
              <button
                onClick={downloadQR}
                disabled={isDownloading}
                className={`bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-1 active:translate-y-0 ${
                  isDownloading ? "opacity-75 cursor-wait" : ""
                }`}
              >
                {isDownloading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
                {isDownloading ? "Downloading..." : "Download QR Code"}
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
