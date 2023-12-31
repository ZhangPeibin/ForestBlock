import type { NextPage } from "next";
import { useState } from "react";
import { Header } from "~~/components/Header";
import { MetaHeader } from "~~/components/MetaHeader";
import { gridLines, gridBoxColor, getTranslateY } from "~~/components/PaintLand";
import { FaucetButton } from "~~/components/scaffold-eth";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";

export type LandClickType = (arg1: number, arg2: number) => void;

const Lands: NextPage = () => {

  const [localMousePos, setLocalMousePos] = useState({ x: 0, y: 0 });

  const landClick: LandClickType = (x: number, y: number) => {
    setLocalMousePos({ x, y })
  }

  const svgEles = [];
  svgEles.push(gridLines())
  svgEles.push(gridBoxColor(landClick))

  svgEles.push(
    <image x="10.25" y={10.25 + getTranslateY()} href="https://pic1.zhimg.com/v2-8e3abe6a02e63d96d0e8f341537300d4_b.webp" width="9.5" height="9.5" preserveAspectRatio="xMinYMin slice" opacity={1}></image>
  )

  return (
    <>
      <MetaHeader
        title="Forest | Lands"
        description=""
      />

      <div className="bg-base-300 w-screen h-screen block relative ">

        <div
          data-zoom-on-wheel="zoom-amount: 0.01; min-scale: 0.5; max-scale: 100;"
          data-pan-on-drag="true">
          <svg xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            id="grid"
          >
            <g id="viewport"
              transform="matrix(0.571830985915493,0,0,0.571830985915493,104.0845070422535,0)"
              className="svg-pan-zoom_viewport"
            >
              {svgEles}
              <text x="0" y="20" fill="green">Verdantia land </text>
            </g>

          </svg>
        </div>

        <div
            className="card bg-base-200 shadow-xl fixed w-[360px] right-4 top-4 bottom-4 p-4 overflow-y-auto">
            
            <RainbowKitCustomConnectButton />

            <b className="text-white">
              {"Loction : "}({localMousePos.x}, {localMousePos.y})
            </b>

            <div className="bg-base-100 shadow-xl mt-4">
              <div className="card-body">
                <h2 className="card-title">No.1 🌲</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>

            <div className="bg-base-100 shadow-xl mt-4">
              <div className="card-body">
                <h2 className="card-title">No.1 🌲</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>

            <div className="bg-base-100 shadow-xl mt-4">
              <div className="card-body">
                <h2 className="card-title">No.1 🌲</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
            
          </div>
      </div>
    </>
  );
};

export default Lands;
