import fs from 'fs';
import path from 'path';

const ReadFileContent = async (fileName) => {
  const filePath = path.join(process.cwd(), `/result/${fileName}`);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  return fileContent;
};

export default ReadFileContent;
