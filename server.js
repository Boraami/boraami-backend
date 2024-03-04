

//import packages
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

//import routes
const userRoutes = require('./Routes/userRoutes');
dotenv.config()

//create server

const app = express();

const port = process.env.PORT || 5000;

mongoose.connect( process.env.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(
    ()=> console.log("successfully connected to database")
).catch( err => console.log(err))

//set up body parser
app.use(bodyParser.json());

//set up cors
app.use( (req,res, next)=>{
    res.header("Acess-Control-Allow-Origin", "*");
    res.header("Acess-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
    next()
})

app.use('/api/users', userRoutes);


app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})