require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health',(req,res)=>{
    res.json({ok:true})
})

app.use((err,req,res,next)=>{
    console.error(err);
    res.status(err.status || 500).json({message: err.message || 'Server Error'});
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('DB Connected');
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
}).catch((err)=>{
        console.error('DB Connection failed',err.message);
        process.exit(1);
    })