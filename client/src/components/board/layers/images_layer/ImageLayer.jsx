import { Image } from "react-konva";

const ImageLayer = (props) => {
  const { image, onSelect, shapeRef, onChange, shapeProps } = props;
  return (
      <Image
        width={shapeProps.width}
        height={shapeProps.height}
        x={shapeProps.x}
        y={shapeProps.y}
        stroke="black"
        image={image}
        rotation={shapeProps.rotation}
        onClick={onSelect}
        ref={shapeRef}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
          e.target.moveToTop();
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          node.width(Math.max(5, node.width() * scaleX));
          node.height(Math.max(node.height() * scaleY));

          node.rotation();

          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),

            width: node.width(),
            height: node.height(),
            rotation: node.rotation(),
          });
        }}
      />
  );
};

export default ImageLayer;
