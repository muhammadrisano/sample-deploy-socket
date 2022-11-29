const userModel = require('../model/user.model');
const { success, failed, succesWithToken } = require('../helper/response');
const jwtToken = require('../helper/generateJWT');

const bcyrpt = require('bcrypt');

module.exports = {
    register: (req, res) => {
        try {
            const { username, phone, password } = req.body;
            bcyrpt.hash(password, 10, (err, hash) => {
                if (err) {
                    failed(res, err.message, 'failed', 'fail hash password');
                }

                const data = {
                    username,
                    phone,
                    password: hash,
                }
                console.log(data);
                userModel.register(data).then((result) => {
                    success(res, result, "success", "register success")
                }).catch((err) => {
                    console.log(err)
                    failed(res, err.message, 'failed', "register fail")
                })
            })
        } catch (err) {
            failed(res, err.message, 'failed', 'internal server error');
        }

    },

    login: async (req, res) => {
        const { username, password } = req.body;
        userModel.checkUsername(username).then((result) => {
            // console.log(res);
            const user = result.rows[0];
            if (result.rowCount > 0) {
                bcyrpt.compare(password, result.rows[0].password).then(async (result) => {
                    if (result) {
                        const token = await jwtToken({
                            username: user.username,
                        });
                        console.log(token);
                        // delete password
                        delete user.password;
                        success(res, {
                            token,
                            data: user
                        }, "success", "login success");
                    } else {
                        // ketika password salah
                        failed(res, null, 'failed', 'username atau password salah');
                    }
                })
            } else {
                // ketika username salah
                failed(res, null, 'failed', 'username atau password salah');
            }
        }).catch((err) => {
            failed(res, err.message, 'failed', 'internal server error');
        })
    },

    list: (req, res) => {
        userModel.selectAll()
            .then((results) => {
                success(res, results, 'success', 'get all user success');
            }).catch((err) => {
                failed(res, err.message, 'failed', 'get all user failed');
            })
    },

    detail: (req, res) => {
        const id = req.params.id
        userModel.selectDetail(id).then((results) => {
            res.json(results)
        }).catch((err) => {
            res.json(err)
        })
    },

}
