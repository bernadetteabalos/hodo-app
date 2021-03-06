import { useEffect, useRef } from "react";

// import from other libraries
import { Transformer } from "react-konva";
import useImage from "use-image";

// import other Components
import RectangleSquareLayer from "../layers/shapes_layer/RectangleSquareLayer";
import CircleLayer from "../layers/shapes_layer/CircleLayer";
import StarLayer from "../layers/shapes_layer/StarLayer";
import ImageLayer from "../layers/images_layer/ImageLayer";
import TextLayer from "../layers/text_layer/TextLayer";
import LineLayer from "../layers/line_layer/LinesLayer";

const Element = ({ shapeName, shapeProps, isSelected, onSelect, onChange }) => {
  const [image] = useImage(shapeProps.url, "Anonimus");
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
      {(shapeName === "Rect" || shapeName === "Square") && (
        <RectangleSquareLayer
          onSelect={onSelect}
          shapeRef={shapeRef}
          onChange={onChange}
          shapeProps={shapeProps}
        />
      )}
      {shapeName === "Circle" && (
        <CircleLayer
          onSelect={onSelect}
          shapeRef={shapeRef}
          onChange={onChange}
          shapeProps={shapeProps}
        />
      )}
      {shapeName === "Star" && (
        <StarLayer
          onSelect={onSelect}
          shapeRef={shapeRef}
          onChange={onChange}
          shapeProps={shapeProps}
        />
      )}
      {shapeName === "Image" && (
        <ImageLayer
          image={image}
          onSelect={onSelect}
          shapeRef={shapeRef}
          onChange={onChange}
          shapeProps={shapeProps}
        />
      )}
      {shapeName === "Text" && (
        <TextLayer
          onSelect={onSelect}
          shapeRef={shapeRef}
          onChange={onChange}
          shapeProps={shapeProps}
        />
      )}
      {shapeName === "Line" && (
        <LineLayer
          onSelect={onSelect}
          shapeRef={shapeRef}
          onChange={onChange}
          shapeProps={shapeProps}
        />
      )}
      {isSelected && (
        <Transformer
          ref={trRef}
          keepRatio
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
