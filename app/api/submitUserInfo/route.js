import {NextResponse} from "next/server";
import fs from 'fs';
import path from 'path';

export const POST = async (req, res) =>  {
    const data = await req.json();
    
    try {
        const filePath = path.join(process.cwd(), 'public', 'assets', 'info.json');
        const newData = {
            email: data.email,
            company: data.company
        };

        // 追加数据到文件，每个记录为一行
        fs.appendFileSync(filePath, JSON.stringify(newData) + '\n', 'utf8');
        return NextResponse.json({
            Message: '提交成功！',
            status: 200,
            email: data.email,
            company: data.company
        });
    }catch (error){
        return NextResponse.json({ Message: '提交失败！', status: 500 });
    }
}
