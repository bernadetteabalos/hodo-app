import { useState, useEffect } from 'react';
import axios from "axios";

export default function useApplicationData(id) {
  // Set inital state
  const [title, setTitle] = useState('');
  const [elements, setElements] = useState([]);

  useEffect(() => {
    async function init() {
      const res = await axios.get(`http://localhost:8001/api/boards/${id}`);
      setTitle(res.data.title);
      setElements(res.data.metadata.metadata.map((data) => JSON.parse(data)));
    }
    init()
  }, [id])

  //function for creating Board 
  async function createBoard(title, owner_id) {

    const res = await axios.post('http://localhost:8001/api/boards', {title, owner_id})

  }
  //funciton for deleting Board
  async function deleteBoard(id) {

    const res = await axios.delete('http://localhost:8001/api/boards/1')

  }
  //function for saving Board
  
  async function saveBoard(id, metadata) {
    console.log('LOOK HERE NOW', id, metadata)
    const res = await axios.put('http://localhost:8001/api/boards/1', {id, metadata})

  }

  return {
    elements,
    setElements,
    createBoard,
    deleteBoard,
    saveBoard
  }
  
}
