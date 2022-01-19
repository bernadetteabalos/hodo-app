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
      values: [id]

    }

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);

  }

  const getBoardsByUser = (owner_id) => {
    const query = {
      text: `SELECT * FROM boards WHERE owner_id = $1`,
      values: [owner_id]

    }

    return db.query(query)
      .then(result => result.rows)
      .catch(err => err);

  }

  const getElementsForBoard = () => {
    const query = {
      text: `SELECT metadata FROM boards WHERE boards.id = $1`,
      values: [boards.id]
    }
    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  }

  const addBoard = (title, owner_id, metadata) => {
    const query = {
      text: `INSERT INTO boards (title, owner_id, metadata) VALUES ($1, $2, $3) RETURNING *`,
      values: [title, owner_id, metadata]
    }

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  }

  const saveBoard = (metadata, id) => {
    const query = {
      text: `UPDATE boards SET metadata = $1 WHERE id = $2`,
      values: [{ metadata }, id]
    }

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  }

  const deleteBoard = (id) => {
    const query = {
      text: `DELETE FROM boards WHERE id = $1`,
      values: [id]
    }

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  }

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
  };
};
