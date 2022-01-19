import { v4 as uuidV4 } from "uuid";

export const generateOneElement = (shape, fillColor, strokeColor, url) => {
  let width = 100;
  let height = 100;

  if (url || shape === "Rect") {
    width = 300;
    height = 150;
  }

  return {
    attrs: {
      x: 150,
      y: 150,
      width,
      height,
      rotation: 0,
      stroke: strokeColor,
      fill: fillColor,
      id: uuidV4(),
      shape: shape,
      url: url,
    },
    className: shape,
  };
};
