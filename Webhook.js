import { Server } from "socket.io";
import { createServer } from "http";
import express from 'express'
import bodyParser from "body-parser";

const app = express();
const httpServer = createServer(app);

app.use(bodyParser.json());

const io = new Server(httpServer,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

let data = {}

app.post('/', (req, res) => {
  console.log(req.body);
  data = req.body
  // res.status(200).send(req.body)
  res.send(data)
  io.emit('message', data)
});

app.get('/' , (req,res)=>{
  res.send(data)
  io.emit('message', data);
})

httpServer.listen(5000, ()=>{
  console.log('server starting');
});