import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';
import {Buffer} from "buffer";

export const POST = async (req, res) => {
  const formData = await req.formData();

  const insFile = formData.get('insFile')
  const hklFile = formData.get('hklFile')
  const id = formData.get('id')

  if (!insFile || !hklFile) {
    return NextResponse.json({ Message: 'No files received.' ,status:400});
  }

  const insBuffer = Buffer.from(await insFile.arrayBuffer())
  const hklBuffer = Buffer.from(await hklFile.arrayBuffer())
  try {
    const assetsDir = path.resolve('../xrd');  // 定义存储文件的目录路径

    // 写入文件到public/assets目录
    await writeFile(
        path.join(assetsDir, `${id}.ins`),
        insBuffer
    );
    await writeFile(
        path.join(assetsDir, `${id}.hkl`),
        hklBuffer
    );
    return NextResponse.json({ Message: 'Success', status: 201 });
  } catch (error) {
    console.log('Error occured ', error);
    return NextResponse.json({ Message: 'Failed', status: 500 });
  }
};
