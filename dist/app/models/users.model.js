"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const addressSchema = new mongoose_2.Schema({
    country: {
        type: String,
        enum: ["Bangladesh", "US", "India", "Others"],
        default: "Bangladesh",
    },
    city: { type: String, enum: ["Dhaka", "Shylet", "Rangpur", "Others"] },
}, { _id: false });
const friendSchema = new mongoose_2.Schema({
    name: { type: String },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Please type valid email address.",
        ],
    },
}, {
    _id: false
});
exports.userSchema = new mongoose_2.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [15, "Name have not 15 characters longer. got {VALUE} "],
        minlength: [3, "Name have not 3 characters shorter. got {VALUE} "],
    },
    email: {
        type: String,
        required: [true, "Invalid type email!"],
        unique: [true, "this email already exist."],
        trim: true,
        index: true,
        lowercase: true,
        // approach 1
        validate: [validator_1.default.isEmail, "Invalid type {VALUE} email"],
        // approach 2
        // validate: {
        //   validator:function(value){
        //     return  /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)
        //   },
        //   message: (props)=> `Invalid ${props.value} email address.`
        // }
        // approach 3
        // match: [
        //   /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        //   "Please type valid email address.",
        // ],
    },
    gender: {
        type: String,
        enum: ["MALE", "FEMALE", "CUSTOM"],
        uppercase: true,
        required: true,
    },
    address: {
        type: addressSchema,
    },
    friends: [{ type: friendSchema }],
    age: {
        type: Number,
        max: [60, "Age must be less then 60. got {VALUE}"],
        min: [18, "Age must be gater then 18. got {VALUE}"],
        required: true,
    },
    skills: [{ type: String, default: "" }],
    isActive: { type: Boolean, default: false },
    phone: {
        type: String,
        match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"],
    },
    role: {
        type: String,
        enum: {
            values: ["ADMIN", "USER", "SUPER-ADMIN"],
            message: "Invalid role '{VALUE}'",
        },
        default: "ADMIN",
        uppercase: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.User = (0, mongoose_1.model)("User", exports.userSchema);
