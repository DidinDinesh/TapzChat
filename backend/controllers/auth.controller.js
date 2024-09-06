import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateTokens.js";

export const signup = async (req,res) => {
    try {
        const { fullName, username, password, ConfirmPassword, gender } = req.body;

        // checking whether password is matching

        if (password !== ConfirmPassword) {
            return res.status(400).json({error:"password do not match"})
        }

        // checking username allready taken

        const user = await User.findOne({username});     

        if(user) {
            return res.status(400).json({error:"username allready exists"})
        }

        // hashing password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        // random profilepic selecting from api

        const randomProfilePic = `https://ui-avatars.com/api/?name=${fullName}&background=87CEEB&color=222`

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: randomProfilePic 
        })

        if(newUser) {

            //generate jwt token

            generateTokenAndSetCookie(newUser._id, res)

            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(500).json({error: "invalid user datay"})
        }

    } catch (error) {
        console.log("error in signup controller", error.message);
        res.status(500).json({error:"internal server error"})
    }
}

export const login = async (req,res) => {
    try {

        const { username, password } = req.body;

        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect) {
           return res.status(400).json({error:"invalid username or password"})
        }

        generateTokenAndSetCookie(user._id, res);
        
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log("error in login controller", error.message);
        res.status(500).json({error:"internal server error"})
    }
}

export const logout = (req,res) => {
   try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({message:"Logged out successfully"})
   } catch (error) {
        console.log("error in logout controller", error.message);
        res.status(500).json({error:"internal server error"})
   }
}
