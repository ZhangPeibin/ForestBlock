import React from "react";
import { Image } from "react-konva";
import "gifler";


const GIF = ({ src }: { src: string }) => {
  const imageRef = React.useRef<any>(null);
  const canvas = React.useMemo(() => {
    const node = document.createElement("canvas");
    return node;
  }, []);

  React.useEffect(() => {
    // save animation instance to stop it on unmount
    let anim: any;
    (window as any).gifler(src).get((a: any) => {
      anim = a;
      anim.animateInCanvas(canvas);
      anim.onDrawFrame = (ctx:any, frame: any) => {
        ctx.drawImage(frame.buffer, frame.x, frame.y);
        if (imageRef.current != undefined) {
           if(imageRef.current!=null){
            imageRef.current.getLayer().draw();
           }
        }
      };
    });
    if (anim != undefined)
      return () => anim.stop();
  }, [src, canvas]);

  return <Image alt="" image={canvas} ref={imageRef} />;
};


export default GIF;