import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Canvas, useFrame, } from "@react-three/fiber";

import Box from "~~/components/r3f/Box";
import GIF from "~~/components/GIF";
import DynamicGIF from "~~/components/DynamicGIF";
import DynamicGIFComponent from "~~/components/DynamicGIF";

const Home: NextPage = () => {

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10 bg-base-100">
        <div className="px-5" >
          <h1 className="text-center  ">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">🌴🌳🌲</span>
          </h1>
          <p className="text-center text-lg">
            Plant a tree in the blockchain and own a tree in the real world
          </p>
        </div>

        <div className="flex-grow bg-base-100 w-full">

          <div className="flex justify-center items-center  bg-base-100 flex-col sm:flex-row mb-8">
            <Canvas
              shadows
              style={{ height: 330 }}
              camera={{ position: [-6, 7, 7] }}
            >

              <ambientLight >{/*该光全局均匀地照亮场景中的所有对象。不加光源，几何体就是黑色的*/}</ambientLight>
              <pointLight color="white" intensity={2} position={[10, 10, 10]} />
              {/* <Box position={[0, 4, 0]} /> */}
              {/* <Tree position={[0, 4, 0]} /> */}
              <gridHelper rotation={[0, -1, 0]} args={[210, 210, 0x4c443b, 0x4c443b]} >
                { /* 0x535353  0x4c443b  0x626c70 */}
              </gridHelper>

            </Canvas>
          </div>

          <DynamicGIFComponent/>
          
        </div>


      </div>
    </>
  );
};

export default Home;
