const sqlite3 = require('sqlite3').verbose();
let sql;

const db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
});

sql = 'CREATE TABLE users(id INTEGER PRIMARY KEY,first_name,last_name,email,password,access_level DEFAULT 1)';
//db.run(sql);


sql = 'INSERT INTO users(first_name,last_name,email,password,access_level) VALUES(?,?,?,?,?)';
// db.run(sql, ["John", "Smith", "JS@gmail.com", "jsjsjsjs_1234","2"], (err) => {
//     if (err) {
//         return console.error(err.message);
//     }
// });

sql = 'SELECT * FROM users'; // Do THIS NEXT

function getDB() {
    return new Promise((resolve, reject) => {
        db.all(sql, [], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}
getDB().then((rows) => console.log(rows)).catch((err) => console.error(err));

function closeDB() {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
    });
}

function runSQL(statement, params = []) {
    db.run(statement, params, function(err) {
        if (err) {
            return console.error(err.message);
        }
        return this.lastID;
    });
}

function getAllCommands(statement, params = [], callback) {
    db.all(statement, params, (err, rows) => {
        if (err) {
            throw err;
        }
        callback(rows);
    });
}


