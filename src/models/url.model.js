import mongoose, { Schema } from "mongoose";


const urlSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
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
    clickHistory: [
        {
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ],
    isActive: {
        type: Boolean,
        default:true,
    },
    metadata: {
        type: Object,
        default:{},
    }
}, {
    timestamps: true
})


const Url = mongoose.model("Url", urlSchema)


export { Url }