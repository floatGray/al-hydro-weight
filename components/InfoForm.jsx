"use client"
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 定义验证模式
const schema = z.object({
    email: z.string().email({ message: "无效的邮箱地址" }).min(1,{ message: "请填写邮箱地址！" }),
    company: z.string().min(1,{ message: "请填写单位名！" })
});

const InfoForm = () => {
    const methods = useForm({
        resolver: zodResolver(schema),
        mode: 'onTouched'
    });

    const onSubmit = data => {
        fetch('/api/submitUserInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res=>{
            console.log(res)
        })
    };

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded  max-w-lg mx-auto my-10">
                    <p className="text-lg text-center font-medium mb-6">在使用前，请告诉我们您的邮箱与单位</p>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">邮箱</label>
                        <input
                            id="email"
                            type="email"
                            {...methods.register("email")}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="请输入邮箱地址"
                        />
                        {methods.formState.errors.email && (
                            <p className="mt-2 text-sm text-red-600">{methods.formState.errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700">单位</label>
                        <input
                            id="company"
                            type="text"
                            {...methods.register("company")}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="请输入单位名"
                        />
                        {methods.formState.errors.company && (
                            <p className="mt-2 text-sm text-red-600">{methods.formState.errors.company.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                        提交
                    </button>
                </form>
            </FormProvider>
        </>
    );
};

export default InfoForm;
