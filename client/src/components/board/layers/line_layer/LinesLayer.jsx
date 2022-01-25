import { Line } from "react-konva";
import { useState, useRef } from "react";

const LineLayer = (props) => {
  const [tool, setTool] = useState("select");
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const { onSelect, shapeRef, onChange, shapeProps } = props;

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([
      ...lines,
      { tool, points: [pos.x, pos.y], strokeColor: strokeColor },
    ]);
  };

  // activated when the user is drawing the line
  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  return lines.map((line, i) => (
    <Line
      key={i}
      points={line.points}
      stroke={line.strokeColor}
      strokeWidth={5}
      tension={0.5}
      ref={shapeRef}
      {...shapeProps}
      lineCap="round"
      globalCompositeOperation={
        line.tool === "eraser" ? "destination-out" : "source-over"
      }
    />
  ));
};

export default LineLayer;
