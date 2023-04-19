 
// PLACEHOLDER IF TIME ALLOWS

 /* "use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const { v4: uuidv4 } = require("uuid");

// This function deletes all documents of the confirmation collection so only the newest order appears on the page
const deleteConfirmation = async (req,res) => {
    const client = new MongoClient(MONGO_URI,options);
    try{
        await client.connect();
        const db = client.db("GroupProject");
        const result = await db.collection("Confirmation").deleteMany({});
        res.status(200).json({status:200, data: result, message: "All confirmation elements deleted successfully!"});
    }catch(err){
        console.log(err.stack);
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
}

module.exports = {deleteConfirmation}; */