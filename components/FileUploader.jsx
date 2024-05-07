'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import {Loader2} from "lucide-react";
import { useRouter } from 'next/navigation';
import ResultButton from './EnterResultButton';

function FileUploader() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [insFile, setInsFile] = useState(null);
  const [hklFile, setHklFile] = useState(null);
  const [insFileName,setInsFileName] = useState('')
  const [hklFileName,setHklFileName] = useState('')

  const handleInsFileChange = (e) => {
    const insFile = e.target.files[0]
    setInsFile(insFile);
    setInsFileName(insFile.name)
  };
  const handleHklFileChange = (e) => {
    const hklFile = e.target.files[0]
    setHklFile(hklFile);
    setHklFileName(hklFile.name)
  };

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
    setFileName(newFile.name); // 更新状态为文件名
  };

  const [startUpload,setStartUpload] = useState(false)
  const [startAnalysis,setStartAnalysis] = useState(false)
  const [finishUpload,setFinishUpload] = useState(false)
  const [finishAnalysis,setFinishAnalysis] = useState(false)
  const handleUpload = () => {
    setStartUpload(true)
    const formData = new FormData();
    formData.append('insFile', insFile);
    formData.append('hklFile', hklFile)
    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.status === 201){
          setFinishUpload(true)
        }
      })
      .catch((error) => console.error(error));
  };
  const handleAnalysis = () => {
    setStartAnalysis(true)
    fetch('/api/analysis', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.status===200){
          setFinishAnalysis(true)
        }
      })
      .catch((error) => console.error(error));
  };

  const router = useRouter()
  const linkResult = () => {
    router.push('/result')
  }
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
        {insFile && hklFile && !finishUpload && (
            <>
              <Button className="flex justify-center mt-4" onClick={handleUpload}>
                {!startUpload && (
                    <>
                      确认上传
                    </>
                )
                }
                {startUpload && (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  )}
              </Button>
            </>
        )}
        {finishUpload && !finishAnalysis &&(
            <Button
                className="flex justify-center mt-4"
                onClick={handleAnalysis}
            >
              {!startAnalysis && (
                  <>
                    开始分析
                  </>
              )
              }
              {startAnalysis && (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
              )}
            </Button>
        )}
        {finishAnalysis && (
            <ResultButton></ResultButton>
        )}
      </div>
    </div>
  );
}

export default FileUploader;
