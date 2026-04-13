import mongoose, { Schema } from "mongoose";


const urlSchema = new Schema({
    originalURL: {
        type: String,
        required: true,
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
    },
    clicks: {
        type: Number,
        default:0
    },
    isActive: {
        type: Boolean,
        default:true,
    }
}, {
    timestamps: true
})


const Url = mongoose.model("Url", urlSchema)


export { URL }