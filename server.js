import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

io.on('connection', (socket) => {
    console.log('A user connected');
    // Handle socket events here
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
    socket.on("message", (msg) => {
        console.log(msg);
        io.emit("message", msg);
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
