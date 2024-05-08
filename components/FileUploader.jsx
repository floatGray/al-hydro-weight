'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import ResultButton from './EnterResultButton';

function FileUploader() {
  const [insFile, setInsFile] = useState(null);
  const [hklFile, setHklFile] = useState(null);

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);


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

  const [startUpload, setStartUpload] = useState(false)
  const [startAnalysis, setStartAnalysis] = useState(false)
  const [finishUpload, setFinishUpload] = useState(false)
  const [finishAnalysis, setFinishAnalysis] = useState(false)
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
        if (data.status === 201) {
          setFinishUpload(true)
        }
      })
      .catch((error) => console.error(error));
  };
  const [errorMsg,setErrorMsg] = useState('')
  const [errorState,setErrorState] = useState(false)
  const handleAnalysis = () => {
    setStartAnalysis(true)

    setProgress(0); // 重置进度
    setLoading(true);
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress < 99) {
          return oldProgress + 1; // 每次调用递增1%
        }
        clearInterval(interval);
        return 99; // 达到99%后停止增长
      });
    }, 150); // 每200毫秒递增1%

    fetch('/api/analysis', {
      method: 'GET',
    })
      .then((response) => {
        clearInterval(interval); // 停止进度条的定时器
        if (response.status === 200) {
          setProgress(100); // 请求成功，将进度设置为100%
          setLoading(false); // 停止显示进度条
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 200) {
          setFinishAnalysis(true)
        }else{
          setErrorMsg(data.Error)
          console.log(errorMsg)
          setFinishAnalysis(true)
          setErrorState(true)
        }
      })
      .catch((error) => {
        console.error('Error during analysis:', error);
        setLoading(false); // 在出错时也停止加载
      });

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
          <>
            {loading &&
              <div>
                <Progress value={progress} />
                当前进度:{progress}%
              </div>}
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
          </>
        )}
        {finishAnalysis && !errorState && (
          <ResultButton></ResultButton>
        )}
        {finishAnalysis && errorState && (
          <>
          {errorMsg},请刷新页面重新上传！
          </>
        )}
      </div>
    </div>
  );
}

export default FileUploader;
