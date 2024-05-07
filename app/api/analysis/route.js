import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import FilePath from '@/components/FilePath';
export const GET = async (req, res) => {
  try {
    const command = 'cd .. && cd xrd && sh temp_demo_new.sh';
    // 将 exec 转换为 Promise
    const execPromise = (command) =>
      new Promise((resolve, reject) => {
        exec(command, { timeout: 10000 }, async (error, stdout, stderr) => {
          if (error) {
            reject(`exec error: ${error}`);
          } else {
            resolve(stdout);
            console.log(stdout)
          }
          resolve(stdout.trim());
        });
      });

    // 等待 exec Promise 解决
    const output = await execPromise(command);

    const folderName = await FilePath()

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
