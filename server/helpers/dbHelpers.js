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

  const getUsersPosts = () => {
    const query = {
      text: `SELECT users.id as user_id, first_name, last_name, email, posts.id as post_id, title, content
      FROM users
      INNER JOIN posts
      ON users.id = posts.user_id`,
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const updateBoard = (id, title) => {
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
    getUsersPosts,
    updateBoard,
  };
};
