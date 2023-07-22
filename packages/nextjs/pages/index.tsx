import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Canvas, useFrame } from "@react-three/fiber";
import Box from "~~/components/r3f/Box";


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

        <div className="flex-grow bg-base-100 w-full px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row mb-8">
            
            <div style={{ height: 300 }} className="flex flex-col bg-base-300 px-10 py-10 text-center items-center max-w-xs aspect-square">
              <p>
                <Link href="/example-ui" passHref className="link">
                  Mogao Caves Oasis（莫高窟绿洲）
                </Link>
              </p>
              <Canvas
                   shadows
                   style={{width:300,height:300,background:"#ffffff"}}
                  
                   camera={{
                    position:[-6,7,7]
                   }}>
                     <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Box position={[-1.2, 0, 0]} />
                    <Box position={[1.2, 0, 0]} />
                </Canvas>
            </div>

            <div style={{ height: 300 }} className="flex flex-col bg-base-300 px-10 py-10 text-center items-center max-w-xs aspect-square">
              <p>
                <Link href="/example-ui" passHref className="link">
                  Yosemite National Park（约塞米蒂国家公园）
                </Link>
              </p>
            </div>
            <div style={{ height: 300 }} className="flex flex-col bg-base-300 px-10 py-10 text-center items-center max-w-xs aspect-square">
              <p>
                <Link href="/blockexplorer" passHref className="link">
                  Black Forest（黑森林)
                </Link>
                tab.
              </p>
            </div>
          </div>



          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row mt-8">
            <div style={{ height: 300 }} className="flex flex-col bg-base-300 px-10 py-10 text-center items-center max-w-xs aspect-square">
              <p>
                <Link href="/example-ui" passHref className="link">
                  Borneo Rainforest（婆罗洲雨林）
                </Link>
              </p>
            </div>
            <div style={{ height: 300 }} className="flex flex-col bg-base-300 px-10 py-10 text-center items-center max-w-xs aspect-square">
              <p>
                <Link href="/example-ui" passHref className="link">
                  Taiga Forest（针叶林区）
                </Link>
              </p>
            </div>
            <div style={{ height: 300 }} className="flex flex-col bg-base-300 px-10 py-10 text-center items-center max-w-xs aspect-square">
              <p>
                <Link href="/blockexplorer" passHref className="link">
                  Great Barrier Reef（大堡礁）
                </Link>
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
