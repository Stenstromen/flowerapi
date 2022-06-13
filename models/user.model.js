const db = require("../config/db.config");

function getAll() {
  const sql = "SELECT id, username, email FROM users";
  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
      console.log(rows);
    });
  });
}

function getOne(email) {
  const sql = "SELECT * FROM users WHERE email = ?";

  return new Promise((resolve, reject) => {
    db.get(sql, email, (error, rows) => {
      console.log(email);
      if (error) {
        console.error(error.message);
        reject(error);
      }
      console.log(JSON.stringify(rows));
      resolve(rows);
    });
  });
}

function addOne(user) {
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

  return new Promise((resolve, reject) => {
    db.run(sql, [user.username, user.email, user.password], (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

module.exports = {
  getAll,
  getOne,
  addOne,
};
