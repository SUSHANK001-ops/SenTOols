"use client";
import React, { useState } from "react";
import { Link as LinkIcon, ArrowRight, Copy } from "lucide-react";
import Link from "next/link";

const Shortener = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [generated, setGenerated] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!url || !shortUrl) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, shorturl: shortUrl }),
      });

      const result = await response.json();

      // Check if the response contains an error
      if (!response.ok || result.error) {
        setError(result.message || "An error occurred.");
      } else {
        setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shortUrl}`);
        setUrl("");
        setShortUrl("");
        setError("");
        setCopied(false); 
      }
    } catch (err) {
      setError("Failed to generate the short URL.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generated).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[82vh] bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-8 transition-transform duration-500 transform hover:scale-105">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 flex justify-center items-center gap-2 animate-bounce">
            <LinkIcon className="w-6 h-6 text-indigo-600" />
            URL Shortener
          </h1>
          <p className="text-gray-500 text-sm">
            Shorten your links with a click of a button!
          </p>
        </div>

        {/* Form */}
        <div className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Original URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your long URL"
              className="w-full px-4 py-3 mt-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow duration-300 hover:shadow-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Custom Short URL
            </label>
            <div className="flex items-center mt-2">
              <span className="px-4 py-3 bg-gray-100 text-gray-500 border border-r-0 border-gray-300 rounded-l-lg">
                {process.env.NEXT_PUBLIC_HOST}/
              </span>
              <input
                type="text"
                value={shortUrl}
                onChange={(e) => setShortUrl(e.target.value)}
                placeholder="custom-name"
                className="flex-1 px-4 py-3 rounded-r-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow duration-300 hover:shadow-md"
              />
            </div>
          </div>
          <button
            onClick={generate}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Generate Short URL{" "}
            <ArrowRight className="inline-block ml-2 w-5 h-5" />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 bg-red-100 text-red-600 px-4 py-3 rounded-md text-sm animate-pulse">
            {error}
          </div>
        )}

        {/* Success Message */}
        {generated && (
          <div className="mt-6 bg-green-100 text-green-700 px-4 py-4 rounded-md space-y-2">
            <p className="text-sm flex items-center gap-2">
              <span className="font-semibold">Your Short URL:</span>
              <Link
                href={generated}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-800 underline break-all hover:text-green-900 transition-colors"
              >
                {generated}
              </Link>
            </p>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors ${
                copied ? "animate-bounce" : ""
              }`}
            >
              <Copy className="w-4 h-4" />
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shortener;
