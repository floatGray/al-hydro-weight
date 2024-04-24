'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';

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
      <div className="col-span-full">
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <ArrowUpTrayIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        {file && (
          <Link href={'/result'} className="flex justify-center mt-4">
            <Button>查看结果</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default FileUploader;
