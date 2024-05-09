'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export const DownloadButton = () => {
    const [existingID, setExistingID] = useState('')
    async function downloadFile(filename) {
        const downloadUrl = '/api/download';

        try {

            const response = await fetch(downloadUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: existingID }),
            });

            if (response.ok) {
                const blob = await response.blob(); // 需要使用 await 等待获取 Blob 数据
                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(blob);
                downloadLink.download = filename;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            } else {
                console.error('Failed to download file:', response.statusText);
            }
        } catch (error) {
            console.error('Error occurred while downloading file:', error);
        }
    }

    useEffect(() => {
        let id = localStorage.getItem('genId');
        setExistingID(id); // 更新状态变量
    }, []);

    return (
        <div className="flex justify-center">
            <Button onClick={() => downloadFile('your_filename.zip')}>
                点击此处下载文件
            </Button>
        </div>
    );
};
