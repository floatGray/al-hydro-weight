import MoleculeViewer from '@/components/MoleculeViewer';
import ReadFile from '@/components/ReadFile';
import Header from '@/components/Header';
import FilePath from '@/components/FilePath';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
//import { useRouter } from 'next/router';
async function result() {
  const xyzData = await ReadFile('alishatanzhi_AIhydroWeightFinal.xyz');
  let jsonFileContent = await ReadFile('alishatanzhi_AIhydroWeightFinalMetrics.json');
  let fileZip = await FilePath()
  jsonFileContent = JSON.parse(jsonFileContent);
  // console.log(folderName)

  const downloadFile = (url, downloadName = '') => {
    // console.log(url);
    const link = document.createElement('a');
    fetch(url).then(res => res.blob()).then((blob) => {
      link.href = URL.createObjectURL(blob);
      // console.log(link.href)
      link.download = downloadName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };
  let formular = jsonFileContent.formular.replace(/([A-Z][a-z]*)(\d+)/g, (match, p1, p2) => `${p1}_{${p2}}`);
  return (
    <>
      <Header />
      <div className="min-h-[450px]">
        <MoleculeViewer xyzData={xyzData}/>
      </div>
      <div
        className="flex justify-center"
        style={{ width: '70%', margin: '0 auto' }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>wr2</TableHead>
              <TableHead>r1</TableHead>
              <TableHead>goof</TableHead>
              <TableHead>q1</TableHead>
              <TableHead>structure_mes</TableHead>
              <TableHead>quality_mes</TableHead>
              <TableHead>Formula</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{jsonFileContent.wr2}</TableCell>
              <TableCell>{jsonFileContent.r1}</TableCell>
              <TableCell>{jsonFileContent.goof}</TableCell>
              <TableCell>{jsonFileContent.q1}</TableCell>
              <TableCell>{jsonFileContent.structure_mes}</TableCell>
              <TableCell>{jsonFileContent.quality_mes}</TableCell>
              <TableCell><InlineMath math={formular} /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      
      </div>
      <div className="flex justify-center">

       <a href={`alishatanzhi_AIhydroWeightFinal.zip`} download>
          <Button>点击此处下载文件</Button>
       </a>
      </div>
    </>
  );
}

export default result;
