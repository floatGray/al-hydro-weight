import { Button } from "./ui/button"
import { useRouter } from 'next/navigation';
function ResultButton(){
    const router = useRouter()
    const enterResult = () => {
        fetch('/api/download',{
            method:'GET'
        }).then(res=>{
            console.log(res)
        })
        router.push('/result')
    }
    return(
        <>
            <Button onClick={enterResult}>查看结果</Button>
        </>
    )
}

export default ResultButton