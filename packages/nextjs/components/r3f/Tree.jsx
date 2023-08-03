import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useRef, useState } from "react";

function Tree(props) {
    const meshRef = useRef(null)
    const colorMap = useLoader(TextureLoader, 'a.webp')
    useFrame((state, delta) => (meshRef.current.rotation.x += 0.01))
    return (
        <mesh
            {...props}
            ref={meshRef}>
            <boxGeometry args={[1, 32, 32]} />
            <meshStandardMaterial normalMap={colorMap} />
        </mesh>
    )
}

export default Tree;
