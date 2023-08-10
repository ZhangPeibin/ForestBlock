import type { NextPage } from "next";
import { useState } from "react";
import { MetaHeader } from "~~/components/MetaHeader";
import { gridLines, gridBoxColor } from "~~/components/PaintLand";


const Lands: NextPage = () => {

  const [localMousePos, setLocalMousePos] = useState({ x: 0, y: 0 });


  const svgEles = [];
  svgEles.push(gridLines())
  svgEles.push(gridBoxColor(landClick))

  svgEles.push(
    <image x="10.25" y="10.25" href="https://pic1.zhimg.com/v2-8e3abe6a02e63d96d0e8f341537300d4_b.webp" width="9.5" height="9.5" preserveAspectRatio="xMinYMin slice" opacity={1}></image>
  )

  function landClick(x: number, y: number) {
    setLocalMousePos({ x, y })
  }



  return (
    <>
      <MetaHeader
        title="ForestBlock | Lands"
        description=""
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
      </MetaHeader>
      <div className="bg-base-100 w-screen h-screen block relative ">
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
            </g>
          </svg>


        </div>

        <div
          className="card bg-base-300 shadow-xl fixed w-[360px] pointer-events-none right-16 top-16 bottom-8 p-8">
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
        </div>


      </div>
    </>
  );
};

export default Lands;
