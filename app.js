import express from "express";
import {MongoClient} from "mongodb"
import {bookRouter} from "./routes/bookRoutes.js"
import {userRouter} from "./routes/usersRouter.js";
import session from "express-session"
import MongoStore from "connect-mongo";


const app = express();
app.use(express.json())


let mongoURI = "mongodb://localhost:27017/alms";
async function connectDatabase () {
    let client = await MongoClient.connect(mongoURI);
    console.log("successful connection to database");
    return client.db();
}

export let db = await connectDatabase();

app.use(session({
    secret: 'mySecret',
    saveUninitialized: false,
    cookie: {expires: new Date(253402300000000)},
    store: new MongoStore({
        mongoUrl: "mongodb://localhost:27017/alms",
        collectionName: "sessions"
    })
}))


app.use(express.static("front"))
app.use("/books", bookRouter);
app.use("/auth", userRouter);


app.get("/", (req, res) => {
    // res.sendFile(path.resolve("front/main.html"))
    res.redirect("/main.html")
});


app.listen(3001) 
