import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateRefreshToken from "../utils/refreshToken.js";
import generateAccessToken from "../utils/accessToken.js";

//Register
export const register = async (req, res) => {
  try {
    //fetch data from Request body
    const { name, email, password, role } = req.body;
    console.log("Register user data:", name, email, password, role);
    
    //validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All Fields are required",
      });
    }
    //if check user is alread exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User is Already exist, Please Try another Gmail",
      });
    }
    //password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.error("Register user Error!!", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
    });
  }
};

//Login
export const login = async (req, res) => {
  try {
    //fetch data from request body
    const {email, password} = req.body;
    //validation
    if(!email || !password){
        return res.status(400).json({
            message:"All fileds are required!!"
        })
    }
    //if check user exist or not
    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({
            message:"User not exist, Please Register First!!"
        })
    }

    //Password Match
    const isPasswordMatch = bcrypt.compare(password, user.password);
    if(!isPasswordMatch){
        return res.status(400).json({
            message:"Invalid Password"
        })
    }

    //Generate token
    const data = {
        id: user._id,
        role: user.role,
    }
    const accessToken = generateAccessToken(data);
    const refreshToken = generateRefreshToken(data);


    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    })

    res.json({
        success:true,
        message:`Welcome back ${user.name}`,
        accessToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
  } catch (error) {
    console.error("Login Error!!", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
    });
  }
};

//refresh token
export const refreshAccessToken = async (req, res) => {
    try {
        const {refreshToken} = req.cookies;
        if(!refreshToken){
            return res.status(401).json({
                message:"No Refresh Token provided"
            })
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err){
                return res.status(403).json({
                    message:"Invalid refresh token"
                })
            }
            const accessToken = jwt.sign(
                { id: decoded.id, role: decoded.role },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: "15m"}
            );
            res.json({ accessToken });
        });
    } catch (error) {
        console.error("Refresh Token Error!!", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!!",
        });
        
    }
}

//Logout
export const logout = async(req, res) => {
    try {
        res.clearCookie("refreshToken",
          {
            httpOnly:true,
            secure:true,
            sameSite:"strict"
          });
          res.json({
            message:"Logged Out Successfully!!"
          })
    } catch (error) {
        console.error("Logout error!", error);
        res.status(500).json({
            success:false,
            message:"Internal server error!!"
        })
    }
}