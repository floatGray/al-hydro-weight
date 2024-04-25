import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

export const GET = async (req, res) => {
  try {
    const command = 'bash -c "sleep 3; echo hello"';

    // 将 exec 转换为 Promise
    const execPromise = (command) =>
      new Promise((resolve, reject) => {
        exec(command, { timeout: 10000 }, async (error, stdout, stderr) => {
          if (error) {
            reject(`exec error: ${error}`);
            return;
          }
          if (stderr) {
            reject(`stderr: ${stderr}`);
            return;
          }
          resolve(stdout.trim());
        });
      });

    // 等待 exec Promise 解决
    const output = await execPromise(command);

    // 指定文件夹路径
    const directoryPath = path.join(process.cwd(), 'public/assets/');
    // 异步读取目录中的所有文件
    const files = await fs.readdir(directoryPath);
    // 筛选出.xyz文件
    const xyzFiles = files.filter((file) => file.endsWith('.xyz'));

    if (xyzFiles.length === 0) {
      // 如果没有找到.xyz文件
      return new NextResponse(
        JSON.stringify({
          Message: 'Success',
          CommandOutput: output,
          Error: 'No .xyz files found.',
        }),
        { status: 404 }
      );
    }

    // 选择返回第一个.xyz文件的内容
    const filePath = path.join(directoryPath, xyzFiles[0]);
    const fileContent = await fs.readFile(filePath, 'utf8');

    // 返回命令输出和文件内容
    return new NextResponse(
      JSON.stringify({
        Message: 'Success',
        CommandOutput: output,
        XYZFileName: xyzFiles[0],
        XYZFileContent: fileContent,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error occurred', error);
    return new NextResponse(
      JSON.stringify({ Message: 'Failed', Error: error.toString() }),
      { status: 500 }
    );
  }
};
