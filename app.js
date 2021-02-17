const express = require('express');
const path = require('path');

const messenger = require('socket.io')();

const app = express();

app.use(express.static("public"));

const port = process.env.PORT || 5050;

let users = [];

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html")); 
});

app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, "chat.html")); 
});

const server = app.listen(port, () => {
    console.log(`app is running on ${port}`);
});

messenger.attach(server);

messenger.on('connection', (socket) => {
    console.log(`a user connected to the server: ${socket.id}`);

    // send the connected user their assigned ID
    socket.emit('connected', { sID: `${socket.id}`, message: 'new connection granted'});

    // relays to everyone
    socket.on('userjoined', username => {
        users.push({
            name: username.name,
            id: socket.id
        });
        socket.broadcast.emit('usersUpdate', users)
        socket.emit('usersUpdate', users)
    })

    socket.on('chatmessage', function(msg) {

        messenger.emit('message', { id: socket.id, message: msg});
    });

    socket.on('disconnect', () => {
        users = users.filter(elem => elem.id != socket.id);
        socket.broadcast.emit('usersUpdate', users)
        socket.emit('usersUpdate', users)
        
    })
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             