import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ReadFile from '@/components/ReadFile';
import FileUploader from '@/components/FileUploader';
import Link from 'next/link';
function Home() {
  const onFileChange = () => {
    console.log(1);
  };
  //const router = useRouter()
  const xyzFileContent = ReadFile('a.xyz');
  const jsonFileContent = ReadFile('b.json');
  return (
    <>
      {/*<Input type="file" id="上传文件"></Input>*/}
      <FileUploader />
      <Button>
        <Link href={'/result'}>查看结果</Link>
      </Button>
      <p className="border-4 border-fuchsia-950">{xyzFileContent}</p>
      <p>{jsonFileContent}</p>
    </>
  );
}

export default Home;
