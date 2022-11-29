const db = require('../config/db')

module.exports = {
    store: (data) => {
        const { sender, receiver, message } = data
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO chats (sender, receiver, message) 
            VALUES (${sender}, ${receiver}, '${message}')`, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })
    },

    list: (sender, receiver) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT chats.id, chats.message, userSender.username AS sender, userReceiver.username AS receiver
            FROM chats
            LEFT JOIN users AS userSender ON chats.sender=userSender.id
            LEFT JOIN users AS userReceiver ON chats.receiver=userReceiver.id
            WHERE
            (sender=${sender} AND receiver=${receiver})
            OR (sender=${receiver} AND receiver=${sender})`, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })
    }
}
