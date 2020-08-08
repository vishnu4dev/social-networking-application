const express = require('express');
const dbconnect = require('./config/db')
const User = require('./routes/api/user')
const Auth = require('./routes/api/auth');
const userFeeds = require('./routes/api/post');

const app = express();
dbconnect();
const PORT = process.env.PORT || 8000;

// Use middle-ware
app.use(express.json());

/*Modules */
app.use('/user',User); 
app.use('/auth',Auth); 
app.use('/post',userFeeds)


app.listen(PORT,()=>{
    console.log(`Server is listening in ${PORT}`)
})



