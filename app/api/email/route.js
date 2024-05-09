import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
export const POST = async (req, res) => {
    // const data = await req.json();
    // const email = data.email
    const transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',  // 更换为你的SMTP服务的主机名
        port: 587,                // 更换为对应的端口，通常为587或465
        secure: false,            // true for 465, false for other ports
        auth: {
            user: '471612627@qq.com',  // 你的邮箱账号
            pass: 'junfei020328',           // 你的邮箱密码
        },
    });

    const mailOptions = {
        from: '"wjf" 471612627@qq.com',  // 发件人
        to: '20307130082@fudan.edu.cn',                     // 收件人邮箱
        subject: 'Hello from Nodemailer!',               // 邮件主题
        text: 'Hello!\nThis is a test email sent from a Next.js application.',  // 纯文本内容
        html: '<strong>Hello!</strong><br>This is a test email sent from a Next.js application.',  // HTML内容
        // attachments: [
        //     {   // 附件
        //         filename: 'test.txt',
        //         path: '/path/to/file/test.txt',  // 附件文件的路径
        //     },
        //     {   // 使用URL作为附件
        //         filename: 'image.png',
        //         path: 'https://example.com/path/to/image.png',
        //     },
        // ],
    };

    // 发送邮件
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Failed to send email:', error);
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }

};
