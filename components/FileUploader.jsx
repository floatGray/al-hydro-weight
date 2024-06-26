'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from "lucide-react";
import { generateRandomString } from '@/utils/randomString'
import ResultButton from './EnterResultButton';

function FileUploader() {
  const [insFile, setInsFile] = useState(null);
  const [hklFile, setHklFile] = useState(null);

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [existingID, setExistingID] = useState(''); // 使用 useState 管理 existingID

  const handleInsFileChange = (e) => {
    const insFile = e.target.files[0];
    setInsFile(insFile);
  };

  const handleHklFileChange = (e) => {
    const hklFile = e.target.files[0];
    setHklFile(hklFile);
  };

  const [startUpload, setStartUpload] = useState(false);
  const [startAnalysis, setStartAnalysis] = useState(false);
  const [finishUpload, setFinishUpload] = useState(false);
  const [finishAnalysis, setFinishAnalysis] = useState(false);

  const handleUpload = () => {
    setStartUpload(true);
    const formData = new FormData();
    formData.append('insFile', insFile);
    formData.append('hklFile', hklFile);
    formData.append('id', existingID); // 使用状态变量 existingID
    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 201) {
          setFinishUpload(true);
        }
      })
      .catch((error) => console.error(error));
  };

  const [errorMsg, setErrorMsg] = useState('');
  const [errorState, setErrorState] = useState(false);

  const handleAnalysis = () => {
    setStartAnalysis(true);
    if (progress === 0) {
      setProgress(0); // 重置进度
    }
    setLoading(true);
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress < 99) {
          return oldProgress + 1; // 每次调用递增1%
        }
        clearInterval(interval);
        return 99; // 达到99%后停止增长
      });
    }, 150); // 每150毫秒递增1%

    fetch('/api/analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ existingID }), // 使用状态变量 existingID
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
          setFinishAnalysis(true);
        } else {
          setErrorMsg(data.Error);
          console.log(errorMsg);
          setFinishAnalysis(true);
          setErrorState(true);
        }
      })
      .catch((error) => {
        console.error('Error during analysis:', error);
        setLoading(false); // 在出错时也停止加载
      });

  };

  useEffect(() => {
    let id = localStorage.getItem('genId');
    if (!id) {
      id = generateRandomString(8);
      localStorage.setItem('genId', id);
    }
    setExistingID(id); // 更新状态变量
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto  bg-white border mb-8 rounded-lg">
      <div className="flex flex-col items-center justify-center">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Upload .ins file.
        </label>
        <Input type="file" accept=".ins" onChange={handleInsFileChange} />
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Upload .hkl file.
        </label>
        <Input type="file" accept=".hkl" onChange={handleHklFileChange} />
        {insFile && hklFile && !finishUpload && (
          <>
            <Button className="flex justify-center mt-4" onClick={handleUpload}>
              {!startUpload && (
                <>
                  Upload
                </>
              )}
              {startUpload && (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              )}
            </Button>
          </>
        )}
        {finishUpload && !finishAnalysis && (
          <>
            {loading &&
              <div className="w-full my-4">
                <Progress value={progress} />
                Current progress:{progress}%
              </div>}
            <Button
              className="flex justify-center mt-4"
              onClick={handleAnalysis}
            >
              {!startAnalysis && (
                <>
                  Analysis
                </>
              )}
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
            {errorMsg},Please refresh the page and re-upload!
          </>
        )}
      </div>
    </div>
  );
}

export default FileUploader;
