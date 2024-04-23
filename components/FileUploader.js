'use client';
import React, { useState } from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Input} from "@/components/ui/input";

function FileUploader() {
  const [insFile, setInsFile] = useState(null);
  const [hklFile, setHklFile] = useState(null)

  const handleInsFileChange = (e) => {
    setInsFile(e.target.files[0]);
  };
  const handleHklFileChange = (e) => {
    setHklFile(e.target.files[0])
  }

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
          上传.ins文件
        </label>
        <Input type="file"
               accept=".ins"
        onChange={handleInsFileChange}/>
        <label className="block mb-2 text-sm font-bold text-gray-700">
          上传.hkl文件
        </label>
        <Input type="file"
               accept=".hkl"
               onChange={handleHklFileChange}/>
        {insFile && hklFile && (
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
