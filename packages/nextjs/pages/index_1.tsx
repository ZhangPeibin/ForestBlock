import type { NextPage } from "next";
import { useState } from "react";
import { useContractRead } from "wagmi";
import { useDeployedContractInfo, useNetworkColor } from "~~/hooks/scaffold-eth";
import { getContractNames } from "~~/utils/scaffold-eth/contractNames";
import { notification } from "~~/utils/scaffold-eth";
import { Abi } from "viem";
import { HOW_TO_PLAY } from "~~/generated/constans";

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

  const {
    data: items
  } = useContractRead({
    address: deployedContractData?.address,
    functionName: "getAllItems",
    abi: deployedContractData?.abi as Abi,
    onError: error => {
      notification.error(error.message);
    },
  });


  return (
    <div className="w-screen h-full flex-col">
      <section>
        <div className="px-5" >
          <h1 className="text-center  ">
            <span className="block text-4xl mb-2">Welcome to 🌴🌳🌲</span>
          </h1>
          <p className="text-center text-3xl">
            Plant a digital tree in the blockchain
            <br />
            own a tree in the real world
          </p>
        </div>

      </section>

      <section>
        <div className="flex flex-row ">
          <div className="flex-1 pl-4 pr-4 pb-4 ml-16 mr-16 mb-8 card bg-base-200  w-[360px] pointer-events-none ">
            <div className="hero">
              <div className="hero-content flex-col lg:flex-row">
                <div>
                  <span className="card-title">What is CryptoForest</span>
                  <p >
                    CryptoForest leads innovative full-chain green and low-carbon projects. We transform the on-chain transaction behavior into valuable forest energy to nourish the ever-growing blockchain virtual tree.
                    In the crypto forest, every transaction is a sowing, and every attention is a watering.
                    <br />
                    When the virtual tree matures, you will receive a valuable tree-planting certificate and contribute a corresponding real tree to real-world ecology.</p>

                  <div className="divider">Or</div>

                  <span className="card-title">How to play </span>
                  <p />
                  <ul className="list-decimal ml-4">

                    {HOW_TO_PLAY.map((item: any) => (
                      <li key={item} >
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            </div>

          </div>

          <div>
            <div
              className="mr-16 card bg-base-200 w-[360px]">
              <div className="smt-4">
                <div className="card-body">
                  <h2 className="card-title">🌲 Forest species</h2>
                  {(result as Array<string>)?.map((item: any, index) => (
                    <h2 key={item['id']} className="link">
                      <a target="_blank" rel="noreferrer" href={item['wikiUrl']}>{item['name']}</a>
                    </h2>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="mt-8 mb-16  mr-16 card bg-base-200  w-[360px] pointer-events-none ">
              <div className="smt-4">
                <div className="card-body">
                  <h2 className="card-title">🔨 Forest Items</h2>
                  {(items as Array<string>)?.map((item: any, index) => (
                    <h2 key={item['id']}>
                      <a>{item['name']}  Item </a>
                    </h2>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>

  );
};

export default Home;

