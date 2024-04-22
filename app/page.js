import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ReadFile from '@/components/ReadFile';
import FileUploader from '@/components/FileUploader';
import InfoForm from "@/components/InfoForm";
import VantaBackground from "@/components/MoleculeBackground";
import Header from "@/components/Header";
import Link from 'next/link';
async function Home() {
  const onFileChange = () => {
    console.log(1);
  };

  return (
    <>
        <Header/>
        <VantaBackground/>
      <InfoForm/>
      <FileUploader />
      {/*<p className="border-4 border-fuchsia-950">{xyzFileContent}</p>*/}
      {/*<p>{jsonFileContent}</p>*/}
    </>
  );
}

export default Home;
