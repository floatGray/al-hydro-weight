

import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Script from 'next/script'
import MoleculeViewer from "@/components/MoleculeViewer";
import ReadFileContent from '@/components/readFile';
function Home() {
    const onFileChange = () => {
        console.log(1)
    }
     const xyzFileContent = ReadFileContent('a.xyz');
  const jsonFileContent = ReadFileContent('b.json');
  return (
      <>
          {/*<Input type="file" id="上传文件"></Input>*/}
          {/*<Button></Button>*/}
          <MoleculeViewer/>
            <p className="border-4 border-fuchsia-950">{xyzFileContent}</p>
      <p>{jsonFileContent}</p>
      </>

  );
}
