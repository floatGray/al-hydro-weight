import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { match } from 'assert';

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
        const matches = file.match(/(\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2})_alishatanzhi/);
        console.log(matches)
        if (matches) {
            const datePart = matches[1].substring(0, 10); // 'YYYY-MM-DD'
            const timePart = matches[1].substring(11).replace(/-/g, ':'); // 'HH:MM:SS'
            const standardDateTime = datePart + ' ' + timePart; // 'YYYY-MM-DD HH:MM:SS'
            const folderDate = new Date(standardDateTime);
          console.log(folderDate)
          console.log(latestDate)
          if (folderDate < new Date() && folderDate > latestDate) {
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
