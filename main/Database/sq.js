const sqlite3 = require('sqlite3').verbose();
let sql;

const db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
});

sql = 'CREATE TABLE users(id INTEGER PRIMARY KEY,first_name,last_name,password,email)';
// db.run(sql);


sql = 'INSERT INTO users(first_name,last_name,password,email) VALUES(?,?,?,?)';
db.run(sql, ["John", "Doe", "password123", "john.doe@example.com"], (err) => {
    if (err) {
        return console.error(err.message);
    }
});