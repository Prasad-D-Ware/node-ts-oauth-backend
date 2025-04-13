import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connection";
import authRouter from "./routers/auth.router";
import session from "express-session"
import passportConfig from "./utils/passport";
import passport from "passport";

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

passportConfig()

app.use(session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session()); 

app.use("/auth", authRouter);
app.get("/",(req,res) => {
    res.json({
        msg : "Hello World!"
    })
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server started on ${PORT}`)
})