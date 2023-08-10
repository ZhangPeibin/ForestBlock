import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import TreeGIFCaller from "~~/components/gif/TreeGIF";
import * as THREE from 'three'
import { useMemo, useRef, useState } from "react";
import CameraControls from 'camera-controls';

CameraControls.install({ THREE })

function Controls({ pos = new THREE.Vector3(0, 0, 0), look = new THREE.Vector3(0, 0, 0) }) {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [camera,gl])
  return useFrame((state, delta) => {
    controls.setLookAt(state.camera.position.x, state.camera.position.y, state.camera.position.z, 0, 0, -2, true)
    return controls.update(delta)
  })
}

const MyGrid = () => {
  const ref = useRef<any>(null)

  useFrame(() => {
    if (ref.current) {
      // rotating the object
      ref.current.rotation.y += 0.008;
    }
  });
  return (
    <gridHelper ref={ref} rotation={[0, 0, 0]} args={[5, 24, 0x444444, 0x444444]} >
      { /* 0x535353  0x4c443b  0x626c70 */}
    </gridHelper>
  );
}

const Home: NextPage = () => {

  const [zoom, setZoom] = useState(false)

  const textStyle: any = {
    position: "fixed",
    top: "30%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
    pointerEvents: 'none'
  };

  const canvasDivStyle: any = {
    position: "fixed",
    top: "0",
    left:"0",
    bottom:"0",
    right:"0",
  }


  return (
    <>
      <MetaHeader />
      <div >
        <div style={canvasDivStyle} className="flex justify-center items-center  bg-base-100">
            <Canvas
              shadows
              // camera={{ position: [-6, 7, 7] }}
              camera={{ position: [0, 4, 7] }}
            >

              <ambientLight >{/*该光全局均匀地照亮场景中的所有对象。不加光源，几何体就是黑色的*/}</ambientLight>
              <pointLight color="white" intensity={2} position={[10, 10, 10]} />
              {/* <Box position={[0, 4, 0]} /> */}
              {/* <Tree position={[0, 4, 0]} /> */}
              {/* <gridHelper rotation={[0, -1, 0]} args={[210, 210, 0x4c443b, 0x4c443b]} > */}
              <MyGrid />
              <Controls />

            </Canvas>
        </div>
        <div className="px-5" style={textStyle} >
          <h1 className="text-center  ">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">🌴🌳🌲</span>
          </h1>
          <p className="text-center text-lg">
            Plant a digital tree in the blockchain 
            <br />
            own a tree in the real world
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;

