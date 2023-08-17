import type { NextPage } from "next";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three'
import { useMemo, useRef, useState } from "react";
import CameraControls from 'camera-controls';
import { useContractRead } from "wagmi";
import { useDeployedContractInfo, useNetworkColor } from "~~/hooks/scaffold-eth";
import { getContractNames } from "~~/utils/scaffold-eth/contractNames";
import { notification } from "~~/utils/scaffold-eth";
import { Abi } from "viem";

CameraControls.install({ THREE })

function Controls({ pos = new THREE.Vector3(0, 0, 0), look = new THREE.Vector3(0, 0, 0) }) {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [camera, gl])
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
  const contractNames = getContractNames();
  const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo(contractNames[0]);
  console.log(deployedContractData);
  const {
    data: result,
    isFetching,
    refetch,
  } = useContractRead({
    address: deployedContractData?.address,
    functionName: "getAllSpecs",
    abi: deployedContractData?.abi as Abi,
    onError: error => {
      notification.error(error.message);
    },
  });

  return (
    <div className="bg-base-100 w-screen h-full flex-col">
      <div className="px-5" >
        <h1 className="text-center  ">
          {/* <span className="block text-2xl mb-2">Welcome to</span> */}
          <span className="block text-4xl font-bold">🌴🌳🌲</span>
        </h1>
        <p className="text-center text-lg">
          Plant a digital tree in the blockchain
          <br />
          own a tree in the real world
        </p>
      </div>

      <div className="flex flex-row ">

        <div
          className="ml-16  mr-16 card bg-base-300 shadow-xl h-[420px]  w-[360px] pointer-events-none ">
          <div className="smt-4">
            <div className="card-body">
              <h2 className="card-title">🌲 Forest species</h2>
              {(result as Array<string>)?.map((item: any, index) => (
                <h2 key={item['id']}>
                  <a>{item['name']}</a>
                </h2>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex-1  pl-8 mr-16 mb-16 card bg-base-300 shadow-xl h-[540px]  w-[360px] pointer-events-none ">
          <div >
            <p className="card-title"> Forest species</p>
            <h2 className="card-title">No.1 🌲</h2>
            <p>{contractNames}</p>
          </div>
        </div>



      </div>


    </div>

  );
};

export default Home;

