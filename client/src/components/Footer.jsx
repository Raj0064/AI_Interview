import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">

        {/* Left text */}
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} InterviewIQ. All rights reserved.
          </p>

          <p className="text-xs text-gray-500 mt-1">
            AI-powered interview practice platform to improve your skills and confidence.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-5 text-sm text-gray-600">
          <a href="/" className="hover:text-blue-600">Home</a>
          <a href="/interview" className="hover:text-blue-600">Interview</a>
          <a href="/history" className="hover:text-blue-600">History</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;