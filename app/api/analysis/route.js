import { NextResponse } from 'next/server';
import { exec } from 'child_process';

export const GET = async (req, res) => {
  try {
    const command = 'echo sh completed';

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
    const output = await execPromise(command);
    return new NextResponse(
      JSON.stringify({ Message: 'Success', Output: output }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error occurred', error);
    return new NextResponse(
      JSON.stringify({ Message: 'Failed', Error: error }),
      { status: 500 }
    );
  }
};
