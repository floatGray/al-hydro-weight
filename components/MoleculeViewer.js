// 文件：components/MoleculeViewer.js
"use client";
import dynamic from 'next/dynamic';
import React, { useEffect, useRef } from 'react';
import Script from 'next/script'
// 动态导入3Dmol，禁用SSR
const Viewer = dynamic(() => import('3dmol'), { ssr: false });

const MoleculeViewer = () => {
    const viewerRef = useRef(null)
    const xyzData = `
        3
        water molecule
        O    0.0000    0.0000    0.0000
        H    0.0000    0.7590    0.5860
        H    0.0000   -0.7590    0.5860
    `; // 这里是 XYZ 格式的示例数据
    useEffect(() => {
        async function load3Dmol() {
            const $3Dmol = await import('3dmol');
            if (viewerRef.current && $3Dmol) {
                const viewer = new $3Dmol.GLViewer(viewerRef.current, {
                    defaultcolors: $3Dmol.rasmolElementColors,
                    backgroundColor:'black'
                });
                // viewer.addSphere({ center: {x:0, y:0, z:0}, radius: 10.0, color: 'green' });
                // viewer.setStyle({}, { stick: {} });

                viewer.addModel("3\n\nC 0 0 0\nO 1.16 0 0\nO -1.16 0 0", "xyz");
                viewer.addUnitCell()
                viewer.setStyle({stick:{radius:0.1},sphere:{radius:0.45}});
                viewer.zoomTo();
                viewer.render();
            }
        }
        load3Dmol();
    }, []);


    return(
       <>
           <Script src="https://3Dmol.org/build/3Dmol.js" />
           <div ref={viewerRef} style={{ width: '600px', height: '400px' }} />
       </>
    )
};

export default MoleculeViewer;
