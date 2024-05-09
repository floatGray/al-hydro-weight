import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import FilePath from '@/components/FilePath.js';
import { promises as fs } from 'fs'; // 确保导入 fs 的 promises API
export const POST = async (req, res) => {
  const data = await req.json()
  const id = data.existingID
  console.log(id)
  try {
    const command = `cd .. && cd xrd && sh temp_demo_new.sh ${id}`;
    // 将 exec 转换为 Promise
    const execPromise = (command) =>
      new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            reject(`exec error: ${error}`);
          } else {
            resolve(stdout);
          }
        });
      });

    // 等待 Promise 解决
    await execPromise(command);

    const folderName = await FilePath({id})

    const errorFilePath = `/home/PJLAB/liyuqiang/ai4chem/xrd/${folderName}/ERROR.json`
    try {
      await fs.access(errorFilePath, fs.constants.R_OK); // F_OK用来检查文件是否存在
      const fileContent = await fs.readFile(errorFilePath, 'utf8'); 
      const errorInfo = JSON.parse(fileContent)
      return new NextResponse(
        JSON.stringify({ Message: 'Failed', Error: errorInfo.error,status:500 })
      )
    } catch (error) {
     
    }
  
    return new NextResponse(
      JSON.stringify({ Message: 'Success', status:200 ,id})
    );
  } catch (error) {
    console.error('Error occurred', error);
    return new NextResponse(
      JSON.stringify({ Message: 'Failed', Error: error,status:500 })
    );
  }
};
