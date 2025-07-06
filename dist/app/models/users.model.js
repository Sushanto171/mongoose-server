"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_2 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const notes_model_1 = require("./notes.model");
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
    _id: false,
});
exports.userSchema = new mongoose_2.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [15, "Name have not 15 characters longer. got {VALUE} "],
        minlength: [3, "Name have not 3 characters shorter. got {VALUE} "],
    },
    password: { type: String, required: true },
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.userSchema.methods.updateName = function (name) {
    this.name = name;
    return this.save();
};
exports.userSchema.method("hashPassword", function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        this.password = hashedPassword;
        return hashedPassword;
    });
});
exports.userSchema.static("findByEmail", function findByEmail(email) {
    return this.findOne({ email });
});
exports.userSchema.static("hashPassword", function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = yield bcryptjs_1.default.hash(password, 10);
        return hash;
    });
});
// middleware
// pre
exports.userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log("✅ Pre Middleware",this.password);
        this.password = yield bcryptjs_1.default.hash(this.password, 10);
        next();
    });
});
// post
exports.userSchema.post("save", function (res, next) {
    console.log("%s ✅ Has successfully save", res.email);
    return next();
});
// query post middleware
exports.userSchema.post("findOneAndDelete", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(doc);
        const result = yield notes_model_1.Note.deleteMany({ user: doc._id });
        // console.log({result});
    });
});
exports.userSchema.virtual('firstName').get(function () {
    return `${this.name.split(" ")[0]}`;
});
exports.userSchema.virtual('lastName').get(function () {
    return `${this.name.split(" ")[1]}`;
});
exports.User = (0, mongoose_1.model)("User", exports.userSchema);
