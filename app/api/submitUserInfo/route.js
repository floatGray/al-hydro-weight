import {NextResponse} from "next/server";

export const POST = async (req, res) =>  {
    const data = await req.json();
    try {
        return NextResponse.json({
            Message:'提交成功！',
            status:200,
            email:data.email,
            company:data.company
        })
    }catch (error){
        return NextResponse.json({ Message: '提交失败！', status: 500 });
    }
}
