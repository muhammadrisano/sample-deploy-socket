const db = require('../config/db')

const userModel = {
    // router list
    selectAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users', (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })
    },
    // router - details
    selectDetail: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE id=${id}`, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })
    },

    // router - insert
    store: (username, phone, password) => {
        return new Promise((resolve, reject) => {
            db.query(`
            INSERT INTO users (username, phone, password)
            VALUES
            ('${username}', '${phone}', '${password}')
            `, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })
    },

    // model register
    register: ({ username, phone, password }) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO users(username, phone, password)
      VALUES
      ('${username}', '${phone}', '${password}')`, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })
    },

    // model login
    checkUsername: (username) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE username = '${username}'`, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res);
            })
        })
    }
}

module.exports = userModel
