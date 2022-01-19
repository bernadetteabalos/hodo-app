import React, { useRef, useState } from "react";
import {Stage, Layer, Text } from "react-konva";
import { Html } from 'react-konva-utils';

const TextLayer = (props) => {
  const { onSelect, shapeRef, onChange, shapeProps } = props;
  const inputRef = useRef(null);
  const [text, setText] = useState('Some text here');
  const [isEditing, setIsEditing] = useState(false);

  const onDoubleClick = () => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.focus();
  };

  const onInputChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <Text
        text={text}
        x={50}
        y={80}
        fontSize={20}
        width={200}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
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
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
        onDblClick={onDoubleClick}
      />
      <Html >
        <input type="text" ref={inputRef} value={text} onChange={onInputChange}/>
      </Html>
      
    </>
  );
};

export default TextLayer;