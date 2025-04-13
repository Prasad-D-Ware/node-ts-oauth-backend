import express from "express";
import passport from "passport";
import jwt  from "jsonwebtoken";

declare global {
    namespace Express {
        interface User {
            _id: string;
            user_id: string;
            full_name: string;
            email: string;
            profile_pic: string;
            accessToken: string;
            refreshToken: string;
        }

        interface Request {
            user?: User;
        }
    }
}

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ['profile', 'email' ] , accessType: 'offline', prompt : "consent" } ,));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "http://localhost:5173/signup" }), (req, res) => {
    // console.log(req.user , "USER");

    const token = jwt.sign(
        {
            _id: req.user?._id,
            user_id: req.user?.user_id,
            full_name: req.user?.full_name,
            email: req.user?.email,
            profile_pic: req.user?.profile_pic || "",
            accessToken: req.user?.accessToken,
            refreshToken: req.user?.refreshToken,
        },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
    );
    // console.log(token,"tokennn")
    
    res.redirect(`http://localhost:5173/auth/success?token=${token}`);
});

router.get("/getuser",(req : any, res : any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Not authenticated"
        });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
        res.status(201).json({
            success: true,
            token,
            user: {
                _id: decoded._id,
                user_id: decoded.userId,
                full_name: decoded.full_name,
                email: decoded.email,
                profile_pic: decoded.profile_pic || "",
                accessToken : decoded.accessToken,
                refreshToken : decoded.refreshToken
            }
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Not authenticated"
        });
    }
})


export default router;