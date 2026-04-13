import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js'
import { User } from "../models/user.model.js";

//Access Token And Refresh Token Generation
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)

        if (!user) {
            throw new ApiError(500,"User Not Found In Generation of tokens")
        }
        
        const refreshToken = user.generateRefreshToken()
        if (!refreshToken) {
            throw new ApiError(500,"Generation of tokens")
        }

        const accessToken = user.generateAccessToken()

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })
        
        return { accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500,"Cannot Generate Tokens")
    }
}

//User Registration
const registerUser = asyncHandler(async (req, res) => {
    //Getting Registration Details From User(Frontend)
    const { name, username, email, password } = req.body;

    //Checking Empty Fields
    if (
        [name,username,email,password].some((field)=>field?.trim()==="")
    ) {
        throw new ApiError(400,"All Fields Are Required")
    }
    
    //Checking Existing User
    const exisitngUser = await User.findOne({
        $or:[{username},{email}]
    })

    if (exisitngUser) {
        throw new ApiError(409,"User Email or Username Already Exist")
    }

    //Creating User 
    const user = await User.create({
        name,
        email,
        password,
        username: username.toLowerCase()
    })
    
    //Checking User Created?
    const createdUser = await User.findById(user._id).select("username name email")

    if (!createdUser) {
        throw new ApiError(500,"Something went wrong while creating User")
    }

    return res.json(
        new ApiResponse(201,createdUser,"User Registerd Successfully.")
    )

})

//User Login
const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

if (!(username || email)) {
    throw new ApiError(401,"Username or email Required.")
}

if (!password){
    throw new ApiError(401,"Please Enter Password")
}

const user = await User.findOne({
    $or: [{ username }, { email }]
})

if (!user) {
    throw new ApiError(404,"User Does Not Exist.")
}

const isPasswordValid = await user.isPasswordCorrect(password)

if (!isPasswordValid) {
    throw new ApiError(401,"Please Enter Correct Password.")
}

const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)

const loggedInUser = await User.findById(user._id).select("name username email")


const options = {
    httpOnly: true,
    secure: true
};
    
return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, {
            user: loggedInUser,accessToken,refreshToken
        },
            "User Logged In."
        )
    )

})

export {
    registerUser,
    loginUser
    
}
