const express = require('express')
const { login, register, list, detail } = require('../controller/user.controller')
const router = express.Router()

// const upload = require('../middleware/upload');

// const jwtAuth = require('../middleware/jwtAuth');

// API GET users - list
router
    .get('/user', list)
    .get('/user/:id', detail)
    .post('/register', register)
    .post('/login', login)

module.exports = router
