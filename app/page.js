import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Script from 'next/script'
import MoleculeViewer from "@/components/MoleculeViewer";
function Home() {
    const onFileChange = () => {
        console.log(1)
    }
  return (
      <>
          {/*<Input type="file" id="上传文件"></Input>*/}
          {/*<Button></Button>*/}
          <MoleculeViewer/>
      </>
  );
}

export default Home