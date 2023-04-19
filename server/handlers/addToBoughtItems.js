"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const { v4: uuidv4 } = require("uuid");

const addToBoughtItems = async (req,res) => {
  const client = new MongoClient(MONGO_URI,options);

  try{
    await client.connect();
    const db = client.db("GroupProject");
  
    const _id = req.body._id;

    const userCart = await db.collection("Cart").aggregate([{$unwind: "$cart"}, {$match:{"_id":{$eq: _id}}}, {$replaceRoot:{newRoot: "$cart"}}]).toArray();

    if(userCart.length === 0){
      res.status(500).json({ status: 500, data: req.body, message: "Make sure that you sent the correct user ID" });
    }
    else{
      let i = 0;
      for (i = 0; i < userCart.length ; i++){
        const itemQuant = await db.collection("Items").updateOne({_id: parseInt(userCart[i].itemId)},{$set:{"numInStock": (parseInt(userCart[i].numInStock) - parseInt(userCart[i].numToBuy)) }});
      }
        const boughtCart = userCart.map((obj) =>({"itemId": obj.itemId, "name": obj.name, "price": obj.price, "numBought": obj.numToBuy}));
        const userEmail = "JimmyBuyMore@realcustomer.ca"; 
        let newSet = {$set:{_id:uuidv4(), userEmail:userEmail, cart:boughtCart}}
        const result = await db.collection("BoughtItems").insertOne(newSet.$set);
        const deleteCart = await db.collection("Cart").deleteOne({_id:userEmail});
  
        res.status(201).json({ status: 201, data: newSet.$set, message: "Items successfully bought!" });
    }
  }catch(err){
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

module.exports = {addToBoughtItems};