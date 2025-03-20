const express = require("express")
const app =express()
app.use(express.json())
require("dotenv").config()
const mongoose=require("mongoose")
let cors=require("cors")
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("connected")
})
.catch((err)=>{
    console.log(err)
})

const scoreSchama=mongoose.Schema({
    name:String,
    grade:String,
    score:Number
})
const ScoreModel=mongoose.model("score",scoreSchama)





app.post("/",async(req,res)=>{
    try {
        if (Array.isArray(req.body)) {
            await ScoreModel.insertMany(req.body); // Insert multiple documents
        }
        else{
            let newScore= new ScoreModel(req.body)
             await newScore.save()
        }
       res.status(201).json("added")
    } catch (error) {
        console.log(error)
        res.status(500).json("internal server error")
    }
})




app.get("/",async(req,res)=>{
    try {
       let data=await ScoreModel.find()
       res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json("internal server error")
    }
})



const PORT =process.env.PORT
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})

