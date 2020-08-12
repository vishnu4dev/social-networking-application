const express = require('express');
const dbconnect = require('./config/db')
const User = require('./routes/api/user')
const Auth = require('./routes/api/auth');
const userFeeds = require('./routes/api/post');
const path = require('path');

const app = express();
const cors= require('cors');
app.use(cors());
app.use(cors({origin: true, credentials: true}));

dbconnect();
const PORT = process.env.PORT || 8000;

// Use middle-ware
app.use(express.json());

/*Modules */
app.use('/user',User); 
app.use('/auth',Auth); 
app.use('/post',userFeeds)

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

app.listen(PORT,()=>{
    console.log(`Server is listening in ${PORT}`)
})



