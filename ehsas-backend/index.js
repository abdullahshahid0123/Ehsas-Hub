const express = require('express');
const cors=require('cors');
const { databaseConnect } = require('./config/db');
const router = require('./routes/app-routes');
const dotenv=require('dotenv').config()
const PORT=process.env.PORT;
const bodyParser = require("body-parser");

const app=express();

app.use((bodyParser.json({ limit: "35mb" })) );
app.use(bodyParser.urlencoded({ limit: "35mb", extended: true }));
app.use(express.json())
databaseConnect()

app.use(cors())

app.use(router)

app.listen(PORT,()=>{
    console.log(`Server Running on:${PORT}`)
})