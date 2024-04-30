// pages/api/download.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join('/home/PJLAB/liyuqiang/ai4chem/xrd', req.query.fileZip, 'alishatanzhi_AIhydroWeightFinal.zip');

  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', `attachment; filename=alishatanzhi_AIhydroWeightFinal.zip`);

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
}
