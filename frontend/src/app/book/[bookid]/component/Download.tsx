"use client";
import React from "react";

const Download = ({ pdflink }: { pdflink: string }) => {
  const handledownload = () => {
    window.open(pdflink, "_blank");
  };
  return (
    <div>
      <button
        onClick={handledownload}
        className=" bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 p-2 rounded-md text-white mt-4 hover:scale-105 transition"
      >
        Download
      </button>
    </div>
  );
};

export default Download;
