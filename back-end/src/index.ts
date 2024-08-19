import express, { Express, Request, Response } from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app: Express = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3001",
        credentials: true,
        methods: ["GET", "POST"]
    }
});

io.on("connection", async (socket) => {
    console.log("New Socket Detacted", socket.id);
    socket.emit("connected", socket.id);
})



httpServer.listen(3000, () => {
    console.log("Socket Server is runing on port number 3000");
});