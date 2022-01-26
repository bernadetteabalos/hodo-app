import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Stage, Layer, Text } from "react-konva";
import { Html } from "react-konva-utils";
import "../../../../stylesheets/css/text.css";

const TextLayer = (props) => {
  // deconstructing from props and shapeProps
  const { onSelect, shapeRef, onChange, shapeProps } = props;
  const { text, fontSize, ...rest } = shapeProps;
  // useStates
  const [currentText, setCurrentText] = useState(text);
  // const [fontScale, setScale] = useState(fontSize || 20);
  const [isEditing, setIsEditing] = useState(false);
  // references
  const inputRef = useRef(null);

  const onDoubleClick = () => {
    if (!inputRef.current) {
      return;
    }

    setIsEditing(true);
    inputRef.current.focus();
  };

  const onBlur = () => {
    setIsEditing(false);
  };

  const onInputChange = (e) => {
    setCurrentText(e.target.value);
  };

  useEffect(() => {
    shapeProps.text = currentText;
  }, [currentText]);

  return (
    <>
      <Text
        text={shapeProps.text}
        x={50}
        y={80}
        fontSize={shapeProps.fontSize}
        width={200}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...rest,
            x: e.target.x(),
            y: e.target.y(),
            text: e.target.text(),
            fontSize: e.target.fontSize(),
          });
          e.target.moveToTop();
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          console.log("current font size", node.fontSize());
          onChange({
            ...rest,
            // fontSize: node.attrs.fontSize * scaleX,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
            text: node.text(),
            fontSize: node.fontSize() * scaleX,
          });
          // setScale(node.attrs.fontSize * scaleX);
          console.log("after font size", shapeRef);
        }}
        onDblClick={onDoubleClick}
        {...rest}
      />
      <Html
        transform={true}
        transformFunc={(attrs) => ({
          ...attrs,
          x: shapeRef.current.getAbsolutePosition().x,
          y: shapeRef.current.getAbsolutePosition().y,
        })}
      >
        <input
          draggable={false}
          id="textEdit"
          type="text"
          ref={inputRef}
          value={currentText}
          onChange={onInputChange}
          onBlur={onBlur}
          style={{
            display: !isEditing && "none",
            transform: "translateY(-100%)",
          }}
        />
      </Html>
    </>
  );
};

export default TextLayer;
