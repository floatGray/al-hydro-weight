import { Link } from "lucide-react";
import { Button } from "./ui/button"
import { useRouter } from 'next/navigation';
function ResultButton(){
    const router = useRouter()
    let folderName = ''
    const enterResult = () => {
        router.push('/result')

    }
    return(
        <>
         <Button onClick={enterResult}>查看结果</Button>
        </>
    )
}

export default ResultButton