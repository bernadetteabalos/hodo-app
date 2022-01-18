import Button from "react-bootstrap/Button";

const RightBar = (props) => {
  const { resetBoard, undo, deleteShape } = props;
  return (
    <>
      <div>
        <Button variant="primary">Save</Button>
        <br></br>
        <br></br>
        <Button variant="danger" onClick={resetBoard}>
          Reset Board
        </Button>
        <br></br>
        <br></br>
        <Button variant="warning" onClick={() => undo("shape_image")}>
          Undo Shape OR Rectangle
        </Button>
        <br></br>
        <br></br>
        <Button variant="warning" onClick={() => undo("pen")}>
          Undo Line
        </Button>
        <br></br>
        <br></br>
        <Button variant="warning" onClick={deleteShape}>
          Delete Shape
        </Button>
      </div>
      <div
        style={{ border: "2px solid black", padding: "5px", height: "60vh" }}
      ></div>
    </>
  );
};

export default RightBar;
