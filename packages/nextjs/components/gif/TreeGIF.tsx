'use client';
import dynamic from 'next/dynamic';
import React from 'react';

const TreeGIF = dynamic(() => import('./TreeGIFCanvas'), {
  ssr: false,
});

function TreeGIFCaller({src,width,height}){
  return <TreeGIF src={src} width={width} height={height} />;
}

export default TreeGIFCaller;



