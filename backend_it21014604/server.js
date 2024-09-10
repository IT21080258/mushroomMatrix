const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())



app.get('/',(req,res)=>{
    res.send('Hello Node Api')
})


app.get('/blog',(req,res)=>{
    res.send('Hello blog')
})

app.listen(8070,()=>{
    console.log('Node Api is Running')
})

//GET DATA
app.get('/products',async(req,res)=>{
    // console.log(req.body);
    // res.send(req.body)
    try{
        const product = await Product.find({})
        res.status(200).json(product);

    }catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
//SEND DATA
app.post('/product',async(req,res)=>{
    // console.log(req.body);
    // res.send(req.body)
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);

    }catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
//Delete Data
app.delete('/products/:id',async(req,res)=>{
    // console.log(req.body);
    // res.send(req.body)
    try{
        const {id}= req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:`canot find any product with ID to Delete ${id}`})

        }
       
        res.status(200).json(product);

    }catch (error){
    
        res.status(500).json({message: error.message})
    }
})


mongoose.set("strictQuery",false)
mongoose.connect('mongodb+srv://admin:admin@cluster0.a8s6xus.mongodb.net/mushroomc?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('connected to MongoDB')
}).catch((er)=>{
    console.log(er)
})