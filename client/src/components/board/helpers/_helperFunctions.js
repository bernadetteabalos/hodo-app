export const generateOneElement = (shape, fillColor, strokeColor, url) => {
  return {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    stroke: strokeColor,
    fill: fillColor,
    id: randomNum(),
    shape: shape,
    url: url,
  };
};
