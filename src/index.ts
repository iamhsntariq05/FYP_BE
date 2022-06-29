import express from "express";
import mongoose from "mongoose";
import config from "./config";
import Routes from "./routes";
import { handleErrors } from "./middleware/handleErrors";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import { Server } from "socket.io";

const app = express();

// mongodb connection
// THIS STRING IS THE LINK TO OUR MONGODB
// const url = "mongodb://localhost:27017/fyp";
const url = `mongodb+srv://admin:Ad15ty5vIwsZPytb@fyp.muyak.mongodb.net/fyp?retryWrites=true&w=majority`;
// mongodb connection
// mongoose
//   .connect(url, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   })
//   .then(() => {
//     console.log("Connected to database ");
//   })
//   .catch((err) => {
//     console.error(`Error connecting to the database.\n${err}`);
//   });
mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log('Connected to MongoDB');
  }
);
const PORT = config.port || 8080;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());

app.get("/", (req: any, res: { send: (arg0: string) => any }) =>
  res.send("FYP Backend running!")
);
app.use("/api", Routes);
// middleware to handle errors
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// socket notifications
const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});
let notifications: any[] = [];

io.on("connection", (socket: any) => {
  console.log("A user connected");

  socket.on("sendNotification", (payload: any) => {
    const notification = { noti: payload.noti, room: payload.room };
    notifications.push(notification);
    console.log("noti=>", notifications);

    socket.broadcast.emit("getNotification", notifications);
  });

});

io.listen(8080);
