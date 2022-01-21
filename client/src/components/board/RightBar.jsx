import Button from "react-bootstrap/Button";

const RightBar = (props) => {
  const { clearBoard, undo, deleteShape, saveBoard } = props;
  return (
    <>
      <div>
        <Button variant="primary" onClick={saveBoard}>
          Save
        </Button>
        <br></br>
        <br></br>
        <Button variant="danger" onClick={clearBoard}>
          Clear Board
        </Button>
        <br></br>
        <br></br>
        <Button variant="warning" onClick={() => undo("shape_image")}>
          Undo Shape OR Rectangle
        </Button>
        <br></br>
        <br></br>
        <Button variant="warning" onClick={() => undo("Line")}>
          Undo Line
        </Button>
        <br></br>
        <br></br>
        <Button variant="warning" onClick={deleteShape}>
          Delete Shape
        </Button>
      </div>
    </>
  );
};

export default RightBar;
