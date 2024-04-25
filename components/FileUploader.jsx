'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';

function FileUploader() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [insFile, setInsFile] = useState(null);
  const [hklFile, setHklFile] = useState(null);

  const handleInsFileChange = (e) => {
    setInsFile(e.target.files[0]);
  };
  const handleHklFileChange = (e) => {
    setHklFile(e.target.files[0]);
  };

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
    setFileName(newFile.name); // 更新状态为文件名
  };

  const handleUpload = (files) => {
    console.log(files)
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };
  const handleAnalysis = () => {
    fetch('/api/analysis', {
      method: 'GET',
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
        <Input type="file" accept=".ins" onChange={handleInsFileChange} />
        <label className="block mb-2 text-sm font-bold text-gray-700">
          上传.hkl文件
        </label>
        <Input type="file" accept=".hkl" onChange={handleHklFileChange} />
        {insFile && hklFile && (
          <>
            <Link href={'/result'} className="flex justify-center mt-4">
              <Button>查看结果</Button>
            </Link> 
            <Button
              className="flex justify-center mt-4"
              onClick={handleUpload([insFile, hklFile])}
            >
              确认上传
            </Button>
          </>
        )}
      </div>
      <div className="col-span-full">
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <div className="mt-4 flex flex-col text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <ArrowUpTrayIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>

              {fileName && (
                <div className="mt-2">Selected file: {fileName}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        {file && (
          <>
            <Button className="flex justify-center mt-4" onClick={handleUpload}>
              确认上传
            </Button>
            <Button
              className="flex justify-center mt-4"
              onClick={handleAnalysis}
            >
              开始分析
            </Button>
            <Link href={'/result'} className="flex justify-center mt-4">
              <Button>查看结果</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default FileUploader;
