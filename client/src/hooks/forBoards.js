import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

export default function useApplicationData() {
  // Set inital state
  const [title, setTitle] = useState('');
  const [elements, setElements] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function init() {
      const res = await axios.get(`http://localhost:8001/api/boards/${params.id}`);
      setTitle(res.data.title);
      setElements(res.data.metadata.metadata.map((data) => JSON.parse(data)));
    }
    init()
  }, [params.id])

  //function for creating Board 
  async function createBoard(title, owner_id) {

    const res = await axios.post('http://localhost:8001/api/boards', {title, owner_id})
    return res.data

  }
  //funciton for deleting Board
  async function deleteBoard(id) {

    const res = await axios.delete(`http://localhost:8001/api/boards/${id}`)

  }
  //function for saving Board
  
  async function saveBoard(id, metadata) {
    console.log('LOOK HERE NOW', id, metadata)
    const res = await axios.put(`http://localhost:8001/api/boards/${id}`, {id, metadata})

  }

  return {
    elements,
    board_id: params.id,
    setElements,
    createBoard,
    deleteBoard,
    saveBoard
  }
  
}
