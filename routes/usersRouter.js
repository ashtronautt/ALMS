import { Router } from "express";
import {db} from "../app.js"
import {isValid} from "../middleware/userMiddleware.js"
import bcrypt from "bcrypt"

export let userRouter = new Router()


userRouter.post("/registration", isValid, async (req, res) => {
    let userCollection = db.collection("users");
    let user = req.body;
    let password = user.password;
    let hashPas = await bcrypt.hash(password, 5);
    user.password = hashPas
    await userCollection.insertOne(user);
    res.status(200).json({message : 'successful registration'});
})


userRouter.post("/login", async (req, res) => {
    let userCollection = db.collection("users");
    let user = req.body;
    let find = await userCollection.findOne({email: user.email})
    if (find) {
        if (await bcrypt.compare(user.password, find.password)) {
            req.session.user = find;
            await req.session.save();
            return res.status(200).json({message: "scsess login"})
        }
        return res.status(404).json({message: "invalid password"})  
    }
    return res.status(404).json({message: "user not found"})  
})

userRouter.get("/authChek", async (req, res) => {
    if(!req?.session?.user) {
        return res.status(400).json({message : "user not authorized"})
    }
    return res.status(200).json(req.session.user)
})

userRouter.get("/logout", async (req, res) => {
    await req.session.destroy()
    res.status(200).json({message : "user session destroyed"})
})


userRouter.put("/change/user", async (req, res) => {
    let updateUser = req.body.user;
    let usersCollection = db.collection("users");
    await usersCollection.updateOne({email : req.session.user.email}, {$set: {books : updateUser.books}});
    req.session.user.books = updateUser.books;
    res.status(200).json({message : "successful update"});
})