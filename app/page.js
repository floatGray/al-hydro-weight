import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import ReadFileContent from '@/components/readFile';
import Link from "next/link";
function Home() {
    const onFileChange = () => {
        console.log(1)
    }
    //const router = useRouter()
    const xyzFileContent = ReadFileContent('a.xyz');
    const jsonFileContent = ReadFileContent('b.json');
    return (
        <>
            {/*<Input type="file" id="上传文件"></Input>*/}
            <Button><Link href={'/result'}>查看结果</Link></Button>
            <p className="border-4 border-fuchsia-950">{xyzFileContent}</p>
            <p>{jsonFileContent}</p>
        </>

    );
}

export default Home