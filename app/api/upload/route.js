import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';

export const POST = async (req, res) => {
  const formData = await req.formData();
  const files = formData.getAll('files'); // 获取所有文件
  if (files.length === 0) {
    return NextResponse.json({ error: 'No files received.' }, { status: 400 });
  }

  let errors = []; // 初始化一个数组来收集可能出现的错误信息
  for (let file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());

    // 检查文件扩展名并根据类型更改文件名
    const extension = path.extname(file.name);
    let filename;
    if (extension === '.ins' || extension === '.hkl') {
      filename = `alishatanzhi${extension}`; // 为特定文件类型指定新文件名
    } else {
      filename = file.name.replaceAll(' ', '_');
    }

    try {
      await writeFile(
        path.join(process.cwd(), 'public/assets/' + filename),
        buffer
      );
    } catch (error) {
      console.error('Error occurred while saving file:', file.name, error);
      errors.push(`Failed to save file ${file.name}`);
    }
  }

  if (errors.length > 0) {
    return NextResponse.json({ Message: 'Failed', errors, status: 500 });
  } else {
    return NextResponse.json({
      Message: 'All files successfully saved',
      status: 201,
    });
  }
};
