"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const { v4: uuidv4 } = require("uuid");

const getCompanies = async (req,res) => {
  const client = new MongoClient(MONGO_URI,options);
  try{
    await client.connect();
    const db = client.db("GroupProject");
    const result = await db.collection("Companies").find().toArray();
    res.status(200).json({ status: 200, data: result, message: "Company list found!" });
  }catch(err){
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

module.exports = {getCompanies};