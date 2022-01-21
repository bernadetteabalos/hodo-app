import { Circle } from "react-konva";

const CircleLayer = (props) => {
  const { onSelect, shapeRef, onChange, shapeProps } = props;
  return (
    <Circle
      onClick={onSelect}
      onTap={onSelect}
      ref={shapeRef}
      {...shapeProps}
      rotation={shapeProps.rotation}
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
        node.rotation();

        onChange({
          ...shapeProps,
          x: node.x(),
          y: node.y(),
          width: Math.max(5, node.width() * scaleX),
          height: Math.max(node.height() * scaleY),
          rotation: node.rotation(),
        });
      }}
    />
  );
};

export default CircleLayer;
