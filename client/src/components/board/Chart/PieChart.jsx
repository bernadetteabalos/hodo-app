import { Chart, Dataset } from "react-rainbow-components";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";

const containerStyles = {
  maxWidth: 600,
};

const labels = ["Flight Ticket", "Food", "Hotel", "Amenities"];

const dataset = [
  {
    value: 1500,
    color: "#fe4849",
  },
  {
    value: 1000,
    color: "#ff6837",
  },
  {
    value: 500,
    color: "#ffcc00",
  },
  {
    value: 103,
    color: "#1ad1a3",
  },
];
function renderDataset(cost, colors) {
  // const data = [];
  // const colors = [];
  // dataset.forEach((set) => {
  //   data.push(set.value);
  //   colors.push(set.color);
  // });
  return <Dataset title="Data" values={cost} backgroundColor={colors} />;
}

const PieChart = () => {
  const { expenses } = useContext(AppContext);

  const [cost, setCost] = useState([]);
  const [colors, setColors] = useState([]);
  const [names, setNames] = useState([]);
  useEffect(() => {
    const costArray = [];
    const colorsArray = [];
    const namesArray = [];

    for (const expense of expenses) {
      costArray.push(expense.cost);
      colorsArray.push(expense.color);
      namesArray.push(expense.name);
    }

    setCost(costArray);
    setColors(colorsArray);
    setNames(namesArray);
  }, [expenses]);

  // const cost = [];
  // const colors = [];
  // const names = [];

  // for (const expense of expenses) {
  //   cost.push(expense.cost);
  //   colors.push(expense.color);
  //   names.push(expense.name);
  // }

  // console.log("cost", cost);
  // console.log("names", names);

  return (
    <>
      <div className="rainbow-p-vertical_xx-large rainbow-p-horizontal_medium">
        <div
          style={containerStyles}
          className="rainbow-align-content_center rainbow-m-vertical_large rainbow-m_auto"
        >
          <Chart labels={names} type="pie" legendPosition="right">
            {renderDataset(cost, colors)}
          </Chart>
        </div>
      </div>
    </>
  );
};

export default PieChart;
