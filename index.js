const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socket = require('socket.io')
const socketController = require('./src/socket/index')
const userRoutes = require('./src/routes/user.route')

const http = require('http');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get('/ping', (req, res) => {
    res.json({
        message: 'PONG'
    })
})
app.use(userRoutes)

const server = http.createServer(app);

const io = socket(server, {
    cors: {
        origin: '*'
    }
})

io.on("connection", (socket) => {
    console.log("new user connect")

    socketController(io, socket);
})

const APP_PORT = process.env.PORT || 3005;

server.listen(APP_PORT, () => {
    console.log('listening on port' + APP_PORT);
})