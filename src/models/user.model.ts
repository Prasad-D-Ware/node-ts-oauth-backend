import mongoose from "mongoose";

export interface UserInterface {
    _id: string;
    user_id: string;
    googleId: string;
    full_name: string;
    email: string;
    profile_pic: string;
    accessToken: string;
    refreshToken: string;
};

const userSchema = new mongoose.Schema({
    user_id : {
        type : String,
        required : true,
        unique : true,
    },
    googleId: {
        type: String,
        sparse: true,
        index: {
            unique: true,
            sparse: true,
            partialFilterExpression: { googleId: { $type: "string" } }
        }
    },
    full_name: {
        type: String, 
        required: true 
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    profile_pic: {
        type: String,
        default: ""
    },
    accessToken : {
        type : String,
        required : true,
    },
    refreshToken : {
        type : String,
        required : true,
    }
})


const User = mongoose.model<UserInterface>("Users", userSchema);
export default User;