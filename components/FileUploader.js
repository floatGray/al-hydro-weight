'use client';
import React, { useState } from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Input} from "@/components/ui/input";

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
        <Input type="file"
               accept=".ins,.hkl"
        onChange={handleFileChange}/>
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
