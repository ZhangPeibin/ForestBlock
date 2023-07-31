import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractData } from "~~/components/example-ui/ContractData";
import { ContractInteraction } from "~~/components/example-ui/ContractInteraction";
import "svg-pan-zoom-container"
const ExampleUI: NextPage = () => {


  const svgEles = [];

  for (let i = 0; i <= 100; i++) {
    svgEles.push(
      <line x1={i * 10} y1={0} x2={i * 10} y2={1000} stroke="#ffffff" strokeWidth={0.2} ></line>
    );
  }

  for (let i = 0; i <= 100; i++) {
    svgEles.push(
      <line x1={0} y1={i * 10} x2={1000} y2={i * 10} stroke="#000000" strokeWidth={0.2} ></line>
    );
  }

  return (
    <>
      <MetaHeader
        title="Example UI | Scaffold-ETH 2"
        description="Example UI created with 🏗 Scaffold-ETH 2, showcasing some of its features."
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="bg-base-100" >
        {/* <ContractInteraction /> */}
        {/* <ContractData /> */}

        <div
          data-zoom-on-wheel="zoom-amount: 0.01; min-scale: 0.5; max-scale: 100;"
          data-pan-on-drag="false"
          style={{
            overflow: "hidden", touchAction: "none", userSelect: "none",
            MozWindowDragging: "no-drag", WebkitTapHighlightColor: "rgba(0,0,0,0)"  }}
            >
          <svg xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{height: "calc(100vw)", width: "calc(100vw)"}}
            >
            <g>
              {svgEles}
            </g>
          </svg>
        </div>

      </div>
    </>
  );
};

export default ExampleUI;
