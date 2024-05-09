import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export const POST = async (req, res) => {
  const data = await req.json();
  const id  = data.existingID
  const fileName = data.fileName
  let latestMTime = 0;

  const directoryPath = path.join(process.cwd(), '../xrd');
  const files = await fs.promises.readdir(directoryPath);
  let matchingFolder = null;
  for (let file of files) {
    const filePath = path.join(directoryPath, file);
    const stats = await fs.promises.stat(filePath);
    
    if (stats.isDirectory() && file.includes(id)) {
    
      if (stats.mtimeMs > latestMTime) {
        latestMTime = stats.mtimeMs;
        matchingFolder = file;
      }
    }
  }

  try {

    if (matchingFolder) {
      const targetFilePath = path.join(directoryPath, matchingFolder, fileName);
      const fileContent = await fs.promises.readFile(targetFilePath, 'utf8');
      return NextResponse.json({ Message: 'Success', status: 201 ,fileContent});
    } else {
      throw new Error('No folder found');
    }
  
    
  } catch (error) {
    console.log('Error occured ', error);
    return NextResponse.json({ Message: 'Failed', status: 500 });
  }
};
