import { Url } from "../models/url.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js'
import { nanoid } from "nanoid";




const createShortCode = asyncHandler(async (req, res) => {

    const { originalUrl } = req.body;
    const shortCode = nanoid(6);

    const newUrl = await new Url({
        createdBy: req.user._id,
        originalUrl,
        shortCode,
    }).save()

    
    return res
        .status(200).json(
        new ApiResponse(200,"Link Shorted Successfully",newUrl)
    )
})

export {
    createShortCode,
}