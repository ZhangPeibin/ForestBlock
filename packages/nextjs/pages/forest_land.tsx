import type { NextPage } from "next";
import "svg-pan-zoom-container"
import { MetaHeader } from "~~/components/MetaHeader";

const ExampleUI: NextPage = () => {
  const svgEles = [];

  for (let i = 0; i <= 100; i++) {
    svgEles.push(
      <line x1={i * 10} y1={0} x2={i * 10} y2={1000} stroke="#ffffff" strokeWidth={0.2} ></line>
    );
  }

  for (let i = 0; i <= 100; i++) {
    svgEles.push(
      <line x1={0} y1={i * 10} x2={1000} y2={i * 10} stroke="#ffffff" strokeWidth={0.2} ></line>
    );
  }

  svgEles.push(
    <rect x="0.25" y="0.25" width="9.5" height="9.5" fill="hsl(0,42%,40%)" opacity="1" ></rect>
  )
  svgEles.push(
    <rect x="0.25" y="10.25" width="9.5" height="9.5" fill="hsl(0,42%,40%)" opacity="1" ></rect>
  )
  svgEles.push(
    <rect x="0.25" y="20.25" width="9.5" height="9.5" fill="hsl(0,43%,41%)" opacity="1" ></rect>
  )

  svgEles.push(
    <image x="10.25" y="10.25" href="https://stardewvalleywiki.com/mediawiki/images/4/4b/Daffodil.png" width="9.5" height="9.5" preserveAspectRatio="xMinYMin slice" opacity={1}></image>
  )

  return (
    <>
      <MetaHeader
        title="ForstBlock | Lands"
        description=""
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
      </MetaHeader>
      <div className="bg-base-100 w-screen h-screen block ">
        <div
          className="block"
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

        {/* <div style={{
          width: "500px",
          height:"100vh",
          position: "fixed",
          top: "0px",
          bottom: "0",
          right: "0",
          overflow: "hidden",
          overflowY: "hidden",
          padding:"30px",
          background: "#161923"
        }}>

        </div> */}

      </div>
    </>
  );
};

export default ExampleUI;
