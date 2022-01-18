import { v4 as uuidV4 } from "uuid";

export const generateOneElement = (shape, fillColor, strokeColor, url) => {
  return {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    stroke: strokeColor,
    fill: fillColor,
    id: uuidV4(),
    shape: shape,
    url: url,
  };
};
