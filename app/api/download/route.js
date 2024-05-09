import { NextResponse } from 'next/server';
import FilePath from '@/components/FilePath.js';
import { readFile } from "fs/promises";
import path from "path";


export const POST = async (req, res) => {
  const {id} = await req.json()
  const folderName = await FilePath({id})
  const filePath = path.join(process.cwd(), `../xrd/${folderName}/${id}_AIhydroWeightFinal.zip`);
  const buffer = await readFile(filePath);

  const headers = new Headers();
  headers.append("Content-Disposition", 'attachment; filename="myArchive.zip"'); 
  headers.append("Content-Type", "application/zip");

  return new NextResponse(buffer, {
    headers,
  });
};
