const express = require('express');

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`Server is listening in ${PORT}`)
})

app.get('/intro',(req,res)=>{
    res.send("Welcome to server ");
})

