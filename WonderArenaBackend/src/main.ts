import express, { Request, Response } from "express"
import { createServer } from "http"
import socketio from "socket.io"
import cors from "cors"
import "dotenv/config"

import { AuthRouter } from "./routes/auth/auth.router"
import { GameRouter } from "./routes/game/game.router"
import { addPlayer, getState, removePlayer } from "./game/arena"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/auth", AuthRouter)
app.use("/game", GameRouter)

app.get("/", (_req: Request, res: Response) => {
    res.send("WonderArena Backend")
})

const rawServer = createServer(app)

rawServer.listen(8080, () => {
    console.log("Server running on port 8080")
})

const io = new socketio.Server(rawServer, {
    path: "/real-time",
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    console.log("connected:", socket.id)

    addPlayer(socket.id)

    io.emit("game-update", {
        Players: getState()
    })

    socket.on("player-move", ( { Payload: dx, dy }) => {

    })

    socket.on("player-eliminated", ({  id = socket.id }) => {
        removePlayer(socket.id)

        io.emit("game-update", {
            Players: getState()
        })
    })
})  
