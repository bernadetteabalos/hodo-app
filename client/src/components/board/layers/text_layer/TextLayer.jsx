import React, { useRef, useState } from "react";
import {Stage, Layer, Text } from "react-konva";
import { Html } from 'react-konva-utils';
import "/home/odette/host/hodo-app/client/src/stylesheets/css/text.css"

const TextLayer = (props) => {
  const {
    onSelect,
    shapeRef,
    onChange,
    shapeProps,
  } = props;
  const { text, fontSize, ...rest } = shapeProps;
  const inputRef = useRef(null);
  const [currentText, setCurrentText] = useState(text || 'Some text here');
  const [fontScale, setScale] = useState(fontSize || 20);
  const [isEditing, setIsEditing] = useState(false);

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

  return (
    <>
      <Text
        text={currentText}
        x={50}
        y={80}
        fontSize={fontScale}
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
          });
          e.target.moveToTop();
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          console.log('current font size', node.fontSize())
          onChange({
            ...rest,
            // fontSize: node.attrs.fontSize * scaleX,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
          setScale(node.attrs.fontSize * scaleX);
          console.log('after font size', shapeRef)
        }}
        onDblClick={onDoubleClick}
        {...rest}
      />
      <Html >
        <input
          draggable={false}
          id="textEdit"
          type="text"
          ref={inputRef}
          value={currentText}
          onChange={onInputChange}
          onBlur={onBlur}
          style={{ display: !isEditing && 'none' }}
        />
      </Html>
      
    </>
  );
};

export default TextLayer;