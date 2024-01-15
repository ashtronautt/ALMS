import {db} from "../app.js"

export async function isValid(req, res, next) {
    let userCollection = db.collection("users");
    let email = req.body.email
    let user = await userCollection.findOne({email: email});
    if (user) {
       return res.status(400).json({ message: "registered person"})
    }
    next()
}