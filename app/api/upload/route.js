import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';
import {Buffer} from "buffer";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export const POST = async (req, res) => {
  const formData = await req.formData();

  //const file = formData.get('file');
  const insFile = formData.get('insFile')
  const hklFile = formData.get('hklFile')
  if (!insFile || !hklFile) {
    return NextResponse.json({ Message: 'No files received.' ,status:400});
  }

  //const buffer = Buffer.from(await file.arrayBuffer());
  const insBuffer = Buffer.from(await insFile.arrayBuffer())
  const hklBuffer = Buffer.from(await hklFile.arrayBuffer())
  const insFileName = insFile.name.replaceAll(' ', '_')
  const hklFileName = hklFile.name.replaceAll(' ', '_');
 // const filename = file.name.replaceAll(' ', '_');
  try {
    const assetsDir = path.resolve('./public/assets');  // 定义存储文件的目录路径

    // 写入文件到public/assets目录
    await writeFile(
        path.join(assetsDir, insFileName),
        insBuffer
    );
    await writeFile(
        path.join(assetsDir, hklFileName),
        hklBuffer
    );
    return NextResponse.json({ Message: 'Success', status: 201 });
  } catch (error) {
    console.log('Error occured ', error);
    return NextResponse.json({ Message: 'Failed', status: 500 });
  }
};
