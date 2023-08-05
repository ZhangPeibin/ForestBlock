
import { Stage, Layer } from 'react-konva';
import GIF from './GIF';

function TreeGIFCanvas(props:any) {
  return (
    <Stage width={props.width} height={props.height}>
      <Layer>
            <GIF src={props.src} />
      </Layer>
    </Stage>
  );
}

export default TreeGIFCanvas;