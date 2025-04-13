import { Request , NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
    user: {
        _id: string;
        user_id: string;
        full_name: string;
        email: string;
        profile_pic: string;
        accessToken: string;
        refreshToken: string;
    };
}

const auth = async (req : CustomRequest, res : Response, next : NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
            req.user = {
                _id: decoded._id,
                user_id: decoded.userId,
                full_name: decoded.full_name,
                email: decoded.email,
                profile_pic: decoded.profile_pic || "",
                accessToken : decoded.accessToken,
                refreshToken : decoded.refreshToken
            };
            next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default auth;