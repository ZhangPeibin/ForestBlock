'use client';
import dynamic from 'next/dynamic';

const Canvas = dynamic(() => import('../components/GIF'), {
  ssr: false,
});

export default function Page(props) {
  return <Canvas src={props.src} />;
}