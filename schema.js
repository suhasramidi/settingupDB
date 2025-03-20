const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true,
        trim:true
    }
});

const userModel = mongoose.model("user",schema);

module.exports = userModel;