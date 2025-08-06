import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { upsertStreamUser } from "../lib/stream.js";

export async function signup(req,res) {
    const { fullName, email, password } = req.body;

    try{
        if(!email || !fullName || !password){
            return res.status(400).json({
                message:"All fields are required"
            });
        }

        if(password.length<6){
            return res.status(400).json({
                message:"Password must be at least 6 characters"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({
                message:"Invalid email format"
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:"Email already exists, Please use a different one"
            });
        }

        const idx = Math.floor(Math.random()*100)+1;//generate random number b/w 1-100
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

        const newUser = await User.create({
            fullName,
            email,
            password,
            profilePic:randomAvatar,
        })

        //create User in Stream
        try{
            await upsertStreamUser({
                id: newUser._id.toString(),
                name : newUser.fullName,
                image: newUser.profilePic || "",
            })
            console.log(`Stream user created for ${newUser.fullName}`);
        }catch(error){
            console.log("Error while creating Stream User")
        }

        //jwt token
        const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"
        })

        res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,//prevent from XSS attack
            sameSite : "strict", // prevent from CSRF attacks
            secure: process.env.NODE_ENV == "production"
        })

        res.status(201).json({
            success:true,
            user:newUser
        })
    }catch(error){
        console.log("Error in signup controller", error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

export async function login(req,res) {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"All fields are required"
            });
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Invalid email or password"
            });
        }

        const isPasswordCorrect = await user.matchPassword(password);
        if(!isPasswordCorrect){
            return res.status(401).json({
                message:"Invalid email or password"
            });
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"
        })

        res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,//prevent from XSS attack
            sameSite : "strict", // prevent from CSRF attacks
            secure: process.env.NODE_ENV == "production"
        });
        
        res.status(200).json({
            success:true,
            user
        });
    }catch(error){
        console.log("Error in login controller", error.message);
        res.status(500).json({
            message:"Interval Server Error"
        })
    }
}

export async function logout(req,res) {
    res.clearCookie("jwt");
    res.status(200).json({
        success:true,
        message:"Logout successful"
    })
}

export async function onboard(req, res) {
    try {
        const userId = req.user._id; // from protectRoute middleware

        // Extract required fields from request body
        const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;

        // Check for missing fields
        if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
            return res.status(400).json({
                message: "All fields are required",
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location"
                ].filter(Boolean) //  filter out undefined 
            });
        }

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            userId, // fixed typo: was UserId
            {
                ...req.body, // spread operator to get all fields from request body
                isOnboarded: true // to indicate user has completed onboarding
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        // Upsert user in Stream
        try{
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || "",
            });
            console.log(`Stream user updated for ${updatedUser.fullName}`);
        }catch(streamError){
            console.log("Error while creating/updating Stream User", streamError.message);
        }

        res.status(200).json({
            success: true,
            user: updatedUser
        });

    } catch (error) {
        console.log("Error in onboarding controller", error.message);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
