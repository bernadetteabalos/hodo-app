import { Image } from "react-konva";

const ImageLayer = (props) => {
  const { image, onSelect, shapeRef, onChange, shapeProps } = props;
  return (
    <div>
      <Image
        image={image}
        onClick={onSelect}
        ref={shapeRef}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          node.width(Math.max(5, node.width() * scaleX));
          node.height(Math.max(node.height() * scaleY));

          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: node.width(),
            height: node.height(),
          });
        }}
      />
    </div>
  );
};

export default ImageLayer;
