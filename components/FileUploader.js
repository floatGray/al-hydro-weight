'use client';
import React, { useState } from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";

function FileUploader() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);
    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col items-center justify-center">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Upload File
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-3 w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        />
        {file && (
            <Link href={'/result'} className="flex justify-center mt-4">
              <Button>
                查看结果
              </Button>
            </Link>
        )}
      </div>
    </div>
  );
}

export default FileUploader;
