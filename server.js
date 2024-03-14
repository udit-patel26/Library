const dotenv= require('dotenv')
dotenv.config()

const express = require("express");
const app = express();
const expressLayouts= require("express-ejs-layouts");
const mongoose= require("mongoose");



mongoose.connect(process.env.DB_URL)   
const db = mongoose.connection

const indexRouter = require("./routes/index");

app.set("view engine",'ejs');
app.set("views",__dirname+'/views');
app.set("layout",'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

db.once("open",(err)=>{
    console.log("connected")
})
db.on("error",()=>{
    console.log("There is an error while connecting mongoose")
})



app.use('/',indexRouter)
app.listen(process.env.PORT || 3000)
