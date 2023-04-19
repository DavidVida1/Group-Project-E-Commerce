"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const { v4: uuidv4 } = require("uuid");

//this function gets all the items from a single company using their _id
const getCompanyItems = async (req,res) => {
  const client = new MongoClient(MONGO_URI,options);
  
  const {company} = req.params;
  //since the _id is an int and not a string in the database, we need to turn the req.paramas back to an int
  const companyInt = parseInt(company);

  try{
    await client.connect();
    const db = client.db("GroupProject");
    const result = await db.collection("Items").find({companyId: companyInt}).toArray();

    //making sure the company id is a number and exists in the db before returning it
    if(isNaN(companyInt) === true){
      res.status(500).json({ status: 500, data: {"Tried id":company}, message: "Make sure that the Company ID is a number!" });
    }
    else if (result.length === 0){
      res.status(500).json({ status: 500, data: {"Tried id":companyInt}, message: "Make sure that the Company ID is valid!" });
    }
    else{
      res.status(200).json({ status: 200, data: result, message: `All items by company ${companyInt} found!` });
    }

  }catch(err){
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

module.exports = {getCompanyItems};