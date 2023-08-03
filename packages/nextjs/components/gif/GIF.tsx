import React from "react";
import {Image } from "react-konva";
import "gifler";


const GIF = ({ src }) => {
    const imageRef = React.useRef(null);
    const canvas = React.useMemo(() => {
      const node = document.createElement("canvas");
      return node;
    }, []);
  
    React.useEffect(() => {
      // save animation instance to stop it on unmount
      let anim: any;
      (window as any).gifler(src).get(a => {
        anim = a;
        anim.animateInCanvas(canvas);
        anim.onDrawFrame = (ctx, frame) => {
          ctx.drawImage(frame.buffer, frame.x, frame.y);
          if(imageRef.current != undefined){
            imageRef.current.getLayer().draw();
          }
        };
      });
      if(anim != undefined)
        return () => anim.stop();
    }, [src, canvas]);
  
    return <Image image={canvas} ref={imageRef} />;
  };

  
  export default GIF;