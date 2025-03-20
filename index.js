const express = require("express");
const { default: mongoose } = require("mongoose");
const userModel = require("./schema")

const app = express();

app.use(express.json());

app.get('/suhasdetails', async (req, res) => {
    try {
        const { email } = req.query;

        if (email) {
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(404).send({ msg: "User not found" });
            }
            return res.status(200).send(user);
        } else {
            const users = await userModel.find();
            return res.status(200).send(users);
        }
    } catch (error) {
        res.status(500).send({ msg: "Something went wrong" });
    }
});

app.post('/users',async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!email || !name || !password){
            res.status(400).respond({msg:"All fields are required"});
        }
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            res.status(500).send({msg:"user already exists"});
        }

        const data = new userModel({name,email,password});
        await data.save();
        res.status(200).send({msg:"User created successfullyy.."});

        
    } catch (error) {
        res.status(500).send({msg:"Something went wrong"})
    }

})

app.get('/ping',(req,res)=>{
   res.status(200).send({msg:"Ping-Pong"});
})

app.listen(3030,async()=>{
    try {
        await mongoose.connect("mongodb+srv://ramidisaisuhas:i5YDRhf2BDyKQ66X@cluster0.f7ug8.mongodb.net/")
        console.log("Server connected successfully");
    } catch (error) {
        console.log("Error",error);
    }
})