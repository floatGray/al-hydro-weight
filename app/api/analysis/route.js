import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import FilePath from '@/components/FilePath';
import { promises as fs } from 'fs'; // 确保导入 fs 的 promises API
export const GET = async (req, res) => {
  try {
    const command = 'cd .. && cd xrd && sh temp_demo_new.sh alishatanzhi';
    // 将 exec 转换为 Promise
    const execPromise = (command) =>
      new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            reject(`exec error: ${error}`);
          } else {
            resolve(stdout);
            console.log(stdout)
          }
        });
      });

    // 等待 Promise 解决
    const output = await execPromise(command);

    const folderName = await FilePath()

    const errorFilePath = `/home/PJLAB/liyuqiang/ai4chem/xrd/${folderName}/ERROR.json`
    try {
      await fs.access(errorFilePath, fs.constants.R_OK); // F_OK用来检查文件是否存在
      const fileContent = await fs.readFile(errorFilePath, 'utf8'); 
      const errorInfo = JSON.parse(fileContent)
      return new NextResponse(
        JSON.stringify({ Message: 'Failed', Error: errorInfo.error,status:500 })
      )
    } catch (error) {
      const command2 = `cp -r /home/PJLAB/liyuqiang/ai4chem/xrd/${folderName}/alishatanzhi_AIhydroWeightFinal.zip /home/PJLAB/liyuqiang/ai4chem/al-hydro-weight/public`
      const execPromise2 = (command2) =>
        new Promise((resolve, reject) => {
          exec(command2, (error, stdout, stderr) => {
            if (error) {
              reject(`exec error: ${error}`);
            } else {
              resolve(stdout);
              console.log(stdout)
            }
          });
        });
  
      // 等待 Promise 解决
      const output2 = await execPromise2(command2);
    }
  


    return new NextResponse(
      JSON.stringify({ Message: 'Success', Output: output,status:200 })
    );
  } catch (error) {
    console.error('Error occurred', error);
    return new NextResponse(
      JSON.stringify({ Message: 'Failed', Error: error,status:500 })
    );
  }
};
