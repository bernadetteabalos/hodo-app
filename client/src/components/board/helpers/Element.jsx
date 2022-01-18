import { useEffect, useRef } from "react";

// import from other libraries
import { Transformer } from "react-konva";
import useImage from "use-image";

// import Other Components
import RectangleSquareLayer from "../layers/shapes_layer/RectangleSquareLayer";
import StarLayer from "../layers/shapes_layer/StarLayer";
import ImageLayer from "../layers/images_layer/ImageLayer";

const Element = ({
  url,
  shapeName,
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}) => {
  const [image] = useImage(url, "Anonimus");
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      {(shapeName === "rectangle" || shapeName === "square") && (
        <RectangleSquareLayer
          onSelect={onSelect}
          shapeRef={shapeRef}
          onChange={onChange}
          shapeProps={shapeProps}
        />
      )}
      {shapeName === "star" && (
        <StarLayer
          onSelect={onSelect}
          shapeRef={shapeRef}
          onChange={onChange}
          shapeProps={shapeProps}
        />
      )}
      {image && (
        <ImageLayer
          image={image}
          onSelect={onSelect}
          shapeRef={shapeRef}
          onChange={onChange}
          shapeProps={shapeProps}
        />
      )}
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default Element;
