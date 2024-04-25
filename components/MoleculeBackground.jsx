"use client"
import React, { useEffect, useRef } from 'react';
import NET from 'vanta/dist/vanta.net.min.js';
import * as THREE from 'three';

const VantaBackground = () => {
    const vantaRef = useRef(null);
    const vantaEffect = useRef(null);  // 使用另一个ref来存储Vanta effect

    useEffect(() => {
        if (!vantaEffect.current) {
            vantaEffect.current = NET({
                el: vantaRef.current,
                THREE: THREE,
                backgroundColor:0x000000
                // 其他Vanta配置选项
            });
        }
        return () => {
            if (vantaEffect.current) {
                vantaEffect.current.destroy();
                vantaEffect.current = null;  // 确保彻底清理
            }
        };
    }, []);

    return <div ref={vantaRef} style={{ height: "100vh", width: "100vw", position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default VantaBackground;

