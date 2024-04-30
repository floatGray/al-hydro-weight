import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export const GET = async (req, res) => {
  try {
    const directoryPath = path.join(process.cwd(), '../xrd');
    const files = await fs.readdir(directoryPath);
    let latestFolder = null;
    let latestDate = new Date(0);

    for (let file of files) {
      const filePath = path.join(directoryPath, file);
      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
        console.log(matches)
        const matches = file.match(/(\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2})_alishatanzhi/);
        if (matches) {
          const folderDate = new Date(matches[1].replace(/_/g, 'T'));
          if (folderDate > latestDate) {
            latestDate = folderDate;
            latestFolder = file;
          }
        }
      }
    }

    if (latestFolder) {
      return NextResponse.json({ Message: 'Success', Folder: latestFolder });
    } else {
      return NextResponse.json({ Message: 'No folders found' });
    }
  } catch (error) {
    console.error('Error occurred', error);
    return NextResponse.json({ Message: 'Failed', Error: error.message }, 500);
  }
};
