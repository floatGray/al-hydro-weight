import MoleculeViewer from '@/components/MoleculeViewer';
import ReadFile from '@/components/ReadFile';
import Header from '@/components/Header';
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
  jsonFileContent = JSON.parse(jsonFileContent);
  // console.log(folderName)

  return (
    <>
      <Header />
      <div className="min-h-[450px]">
        <MoleculeViewer xyzData={xyzData}></MoleculeViewer>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{jsonFileContent.wr2}</TableCell>
              <TableCell>{jsonFileContent.r1}</TableCell>
              <TableCell>{jsonFileContent.goof}</TableCell>
              <TableCell>{jsonFileContent.q1}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center">
        <Button>点击此处下载文件</Button>
      </div>
    </>
  );
}

export default result;
