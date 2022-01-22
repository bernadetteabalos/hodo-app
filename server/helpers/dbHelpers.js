module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: "SELECT * FROM users",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUserByEmail = (email) => {
    const query = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addUser = (firstName, lastName, email, password, profilePhoto) => {
    const query = {
      text: `INSERT INTO users (first_name, last_name, email, password, profile_photo) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      values: [firstName, lastName, email, password, profilePhoto],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const getBoard = (id) => {
    const query = {
      text: `SELECT * FROM boards where id = $1`,
      values: [id],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const getBoardsByUser = (user_id) => {
    const query = {
      text: `SELECT * FROM boards WHERE user_id = $1`,
      values: [user_id],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getElementsForBoard = () => {
    const query = {
      text: `SELECT metadata FROM boards WHERE boards.id = $1`,
      values: [boards.id],
    };
    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const addBoard = (title, user_id, metadata) => {
    const query = {
      text: `INSERT INTO boards (title, user_id, metadata) VALUES ($1, $2, $3) RETURNING *`,
      values: [title, user_id, metadata],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const saveBoard = (metadata, id, budget_data) => {
    const query = {
      text: `UPDATE boards SET metadata = $1, budget_data = $3 WHERE id = $2`,
      values: [{ metadata }, id, budget_data],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => console.log("well I broke", err));
  };

  const deleteBoard = (id) => {
    const query = {
      text: `DELETE FROM boards WHERE id = $1`,
      values: [id],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const updateBoardTitle = (id, title) => {
    const query = {
      text: `
      UPDATE boards 
      SET title = $1 
      WHERE id = $2
      RETURNING *`,
      values: [title, id],
    };

    return (
      db
        .query(query)
        // result.rows[0] => {id: '1', title: 'Japan'}
        .then((result) => result.rows[0])
        .catch((err) => console.log("err", err))
    );
  };

  const updateCollaborators = (user_id, board_id) => {
    const query = {
      text: `INSERT INTO collaborators (user_id, board_id) VALUES ($1, $2) RETURNING *`,
      values: [user_id, board_id],
    };

    return (
      db
        .query(query)
        // result.rows[0] => { id: 7, user_id: 3, board_id: 7 }
        .then((result) => result.rows[0])
      // cannot add a .catch here but if the user_id does not exist, the error will be caught on the collaborators.js side that make the request and will send a res.json w/msg
    );
  };

  const getSpecificBoards = (user_id) => {
    const query = {
      text: `
      SELECT board_id 
      FROM collaborators
      WHERE user_id = $1
      `,
      values: [user_id],
    };

    return (
      db
        .query(query)
        // result.row looks like this:
        //[ { board_id: 1 }, { board_id: 3 } ]
        .then((result) => {
          const boardIdArray = result.rows.map(
            (objBoard) => objBoard["board_id"]
          );
          // boardIdArray looks like: [1,3]
          return boardIdArray;
        })
    );
  };

  const getBoardIdTitle = (id) => {
    const query = {
      text: `SELECT id, title FROM boards where id = $1`,
      values: [id],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  return {
    getUsers,
    getUserByEmail,
    addUser,
    getBoardsByUser,
    getElementsForBoard,
    getBoard,
    addBoard,
    saveBoard,
    deleteBoard,
    updateBoardTitle,
    updateCollaborators,
    getSpecificBoards,
    getBoardIdTitle,
  };
};
