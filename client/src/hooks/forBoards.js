import { useState, useEffect } from 'react';
import axios from "axios";

export default function useApplicationData(id) {
//Set inital state
  const [state, setState] = useState({
    metadata: null
  });

  useEffect(() => {
    async function init() {
      const res = await axios.get('http://localhost:8001/api/boards/1')
      console.log('LOOK  HERE', res.data)
      setState(prev => ({...prev, id: res.data['id'], metadata: res.data['metadata'], owner_id: res.data['owner_id'], title: res.data['title'] }))
    }
    init()
  }, [])

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
    state,
    createBoard,
    deleteBoard,
    saveBoard
  }
  
}
