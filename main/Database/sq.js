const sqlite3 = require('sqlite3').verbose();
const path = require('path');
let sql;

// Use a path relative to this module so requiring from elsewhere works
const dbPath = path.join(__dirname, 'test.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
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
    return new Promise((resolve, reject) => {
        db.run(statement, params, function(err) {
            if (err) {
                return reject(err);
            }
            resolve({ lastID: this.lastID, changes: this.changes });
        });
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

// CRUD helpers
async function createUser(first_name, last_name, email, password, access_level = 1) {
    const stmt = 'INSERT INTO users(first_name,last_name,email,password,access_level) VALUES(?,?,?,?,?)';
    const result = await runSQL(stmt, [first_name, last_name, email, password, access_level]);
    return result.lastID;
}

function getUserById(id) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
    });
}

async function updateUserById(id, fields = {}) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return 0;
    const set = keys.map(k => `${k} = ?`).join(', ');
    const params = keys.map(k => fields[k]);
    params.push(id);
    const stmt = `UPDATE users SET ${set} WHERE id = ?`;
    const result = await runSQL(stmt, params);
    return result.changes;
}

async function deleteUserById(id) {
    const stmt = 'DELETE FROM users WHERE id = ?';
    const result = await runSQL(stmt, [id]);
    return result.changes;
}

function getUserIdByEmail(email) {
    return new Promise((resolve, reject) => {
        db.get('SELECT id FROM users WHERE email = ?', [email], (err, row) => {
            if (err) return reject(err);
            resolve(row ? row.id : null);
        });
    });
}

function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
            if (err) return reject(err);
            resolve(row || null);
        });
    });
}

async function getUserIdByEmail(email, options = {}) {
    const { autoLog = false, closeWhenDone = false } = options;
    const id = await new Promise((resolve, reject) => {
        db.get('SELECT id FROM users WHERE email = ?', [email], (err, row) => {
            if (err) return reject(err);
            resolve(row ? row.id : null);
        });
    });
    if (autoLog) console.log(id);
    if (closeWhenDone) closeDB();
    return id;
}

// getUserIdByEmail('JS@gmail.com').then(id => {
//   console.log(id);
// }).catch(console.error);

// (async () => {
//   try {
//     const id = await getUserIdByEmail('J@gmail.com');
//     console.log('id =', id);
//   } catch (e) {
//     console.error(e);
//   }
// })();

module.exports = {
    getDB,
    closeDB,
    runSQL,
    getAllCommands,
    createUser,
    getUserById,
    getUserIdByEmail,
    getUserByEmail,
    updateUserById,
    deleteUserById
};

