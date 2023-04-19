"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const { v4: uuidv4 } = require("uuid");

// This function gets a single company from the array of companies using the _id
const getCompany = async (req,res) => {
  const client = new MongoClient(MONGO_URI,options);

  const {company} = req.params;
  //since the _id is an int and not a string in the database, we need to turn the req.paramas back to an int
  const companyInt = parseInt(company);

  try{
    await client.connect();
    const db = client.db("GroupProject");
    const result = await db.collection("Companies").findOne({_id: companyInt});

    //making sure the company id is a number and exists in the db before returning it
    if(isNaN(companyInt) === true){
      res.status(500).json({ status: 500, data: {"Tried id":company}, message: "Make sure that the Company ID is a number!" });
    }
    else if (!result){
      res.status(500).json({ status: 500, data: {"Tried id":companyInt}, message: "Make sure that the Company ID is valid!" });
    }
    else{
      res.status(200).json({ status: 200, data: result, message: "Company list found!" });
    }

  }catch(err){
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

module.exports = {getCompany};