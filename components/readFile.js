import fs from 'fs';
import path from 'path';

const ReadFile = async (fileName) => {
  const filePath = path.join(process.cwd(), `/public/assets/${fileName}`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return fileContent;
};

export default ReadFile;
