import { v4 as uuidV4 } from "uuid";

// function called when user clicks btn to generate a shape, text, or img. Fcn generates an object with a shape/img/text element's attributes. (nt: these properties then passed down to Konva components in diff layer components)
export const generateOneElement = (
  x,
  y,
  shape,
  fillColor,
  borderColor,
  url
) => {
  let width = 100;
  let height = 100;

  if (url || shape === "Rect") {
    width = 300;
    height = 150;
  }

  if (shape === "Text") {
    width = 200;
    height = 30;
  }

  return {
    attrs: {
      x,
      y,
      width,
      height,
      rotation: 0,
      stroke: borderColor,
      fill: fillColor,
      id: uuidV4(),
      shape: shape,
      url: url,
      text: "Some text here",
      fontSize: "40",
    },
    className: shape,
  };
};
