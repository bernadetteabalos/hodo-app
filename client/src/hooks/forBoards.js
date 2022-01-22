import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function useApplicationData() {
  // Set inital state
  const [title, setTitle] = useState("");
  const [elements, setElements] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function init() {
      const res = await axios.get(
        `http://localhost:8001/api/boards/${params.id}`
      );
      setTitle(res.data.title);
      setElements(res.data.metadata.metadata.map((data) => JSON.parse(data)));
    }
    init();
  }, [params.id]);

  //function for creating Board
  async function createBoard(title, user_id) {
    const res = await axios.post("http://localhost:8001/api/boards", {
      title,
      user_id,
    });
    return res.data;
  }
  //funciton for deleting Board
  async function deleteBoard(id) {
    const res = await axios.delete(`http://localhost:8001/api/boards/${id}`);
  }
  //function for saving Board

  async function saveBoard(id, metadata, budget_data) {
    console.log("LOOK HERE NOW", id, metadata, budget_data);
    const res = await axios.put(`http://localhost:8001/api/boards/${id}`, {
      id,
      metadata,
      budget_data: { expenses: budget_data },
    });
  }

  async function addCollaborator(user_id, board_id) {
    // updates collaborator table to user_id and board_id. Returns the 'happy' msg
    const res = await axios.post("/api/collaborators", { user_id, board_id });
    return res.data.msg;
  }

  return {
    elements,
    board_id: params.id,
    title,
    setElements,
    createBoard,
    deleteBoard,
    setTitle,
    saveBoard,
    addCollaborator,
  };
}
