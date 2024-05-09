import fs from 'fs';
import path from 'path';

const FilePath = async ({ id }) => {
  const directoryPath = path.join(process.cwd(), '../xrd');
  const files = await fs.promises.readdir(directoryPath);
  let matchingFolder = null;
  for (let file of files) {
    const filePath = path.join(directoryPath, file);
    const stats = await fs.promises.stat(filePath);

    if (stats.isDirectory() && file.includes(id)) {
      matchingFolder = file;
      break;
    }
  }

  if (matchingFolder) {
    return matchingFolder;
  } else {
    throw new Error('No folder found');
  }
};

export default FilePath;
