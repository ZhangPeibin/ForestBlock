import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractData } from "~~/components/example-ui/ContractData";
import { ContractInteraction } from "~~/components/example-ui/ContractInteraction";
import "svg-pan-zoom-container"
const ExampleUI: NextPage = () => {


  const htmlButtons = [];

  for (let i = 0; i <= 100; i++) {
    htmlButtons.push(
      <line x1={i * 10} y1={0} x2={i * 10} y2={1000} stroke="black" strokeWidth={0.2} ></line>
    );
  }

  for (let i = 0; i <= 100; i++) {
    htmlButtons.push(
      <line x1={0} y1={i * 10} x2={1000} y2={i * 10} stroke="red" strokeWidth={0.2} ></line>
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
      <div data-theme="exampleUi" >
        {/* <ContractInteraction /> */}
        {/* <ContractData /> */}

        <div
          data-zoom-on-wheel="zoom-amount: 0.01; min-scale: 0.5; max-scale: 100;"
          data-pan-on-drag="true">
          <svg xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{ height: "100vh", width: "calc(100vw)" }}
          // style={{ overflow:"hidden" , touchAction:"none" ,userSelect:"none",
          //   MozWindowDragging:"no-drag",WebkitTapHighlightColor:"rgba(0,0,0,0)"
          // }}  
          >
            <g>
              {htmlButtons}
            </g>
          </svg>
        </div>

      </div>
    </>
  );
};

export default ExampleUI;
