// 文件：components/MoleculeViewer.js
'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef } from 'react';
import Script from 'next/script';
// 动态导入3Dmol，禁用SSR
const Viewer = dynamic(() => import('3dmol'), { ssr: false });
const MoleculeViewer = ({ xyzData }) => {
  const viewerRef = useRef(null);
  useEffect(() => {
    async function load3Dmol() {
      const $3Dmol = await import('3dmol');
      if (viewerRef.current && $3Dmol) {
        const viewer = new $3Dmol.GLViewer(viewerRef.current, {
          defaultcolors: $3Dmol.rasmolElementColors,
          backgroundColor: 'black',
        });
        viewer.addModel(xyzData, 'xyz');
        viewer.addUnitCell();
        viewer.setStyle({ stick: { radius: 0.1 }, sphere: { radius: 0.45 } });
        viewer.zoomTo();
        viewer.render();
      }
    }
    load3Dmol();
  }, [xyzData]);
  return (
    <>
      <Script src="https://3Dmol.org/build/3Dmol.js" />
      <div style={{
        width: '80%',
        height: '400px',
        position: 'absolute', // 或者 'relative' 根据需求选择
        top: '100px', // 从顶部100px的位置开始
        left: '50%', // 从左边界中心开始
        transform: 'translateX(-50%)', // 向左移动自身宽度的50%，以达到水平居中
        textAlign: 'center'
      }}>
        <div ref={viewerRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </>
  );
};

export default MoleculeViewer;
