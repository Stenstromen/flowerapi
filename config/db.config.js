const sqlDbFile = "./assets/store/db/users.sqlite";
const sqlite3 = require("sqlite3");
const md5 = require("md5");

const db = new sqlite3.Database(sqlDbFile, (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }

  const usersStmt = `
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      email TEXT UNIQUE,
      password TEXT
    )
  `;

  db.run(usersStmt, (error) => {
    if (error) {
      
        console.log('Table "users" already exists, continuing...');
        return;
      
    } else {
      const insert = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
      db.run(insert, ["testing", "testing@domain.com", md5("coolpassword")])
    }
  })
});

module.exports = db;