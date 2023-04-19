"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const { v4: uuidv4 } = require("uuid");

const updateCart = async (req,res) => {
  const client = new MongoClient(MONGO_URI,options);

  //since the database uses ints and we might use strings elsewhere, the numbers are all parsed before being used
  const _id = req.body._id;
  const unparsedId = req.body.itemId;
  const itemId = parseInt(unparsedId);
  let unparsedNumToBuy = req.body.numToBuy;
  let numToBuy = parseInt(unparsedNumToBuy);
  const userEmail = "JimmyBuyMore@realcustomer.ca"; 


  let newSet = {$set:{_id, itemId, numToBuy, userEmail}};

  try{
    await client.connect();
    const db = client.db("GroupProject");

    //these variables find the stock value of the item according to its ID
    const stockAmount = await db.collection("Items").find({_id: itemId}).project({"_id":0, "name":0, "price":0, "body_location":0, "category":0, "imageSrc":0,"companyId":0}).toArray();

    //this variable finds the specific object with the correct item Id in the cart: array with _id: userEmail
    const cartItemObject = await db.collection("Cart").aggregate([{$unwind: "$cart"}, {$match:{"cart.itemId":{$eq: itemId}}}, {$replaceRoot:{newRoot: "$cart"}}]).toArray();

    //before adding the items to the cart collection, we need to check if we have enough inventory to supply the request
    if(isNaN(numToBuy) === true){
      res.status(500).json({ status: 500, data: {unparsedId, unparsedNumToBuy}, message: "Make sure the requested amount is a number" });
    }
    //checking if the item ID returns an item or not
    else if (stockAmount.length === 0) {
      res.status(500).json({ status: 500, data: {itemId: unparsedId}, message: "Make sure the item ID is correct!" });
    }
    //checking if the stock is lower than the asked amount
    else if(numToBuy > stockAmount[0].numInStock || (stockAmount[0].numInStock - numToBuy) < 0 ){
      res.status(500).json({ status: 500, data: {InCart : numToBuy, Stock: stockAmount[0].numInStock}, message: "The stock is too low to accomodate this request" });
    }
    //we also check if the item exists in the cart.
    else if(cartItemObject[0].length === 0 ){
        res.status(500).json({ status: 500, data: itemId, message: "The item you are trying to update does not exist in the cart" });
      }

    //if all checks pass the cart has an updated quantity
    else {
      const stockParsed = stockAmount[0].numInStock;
      const idExistsParsed = cartItemObject[0].itemId;
      const cartNumParsed = cartItemObject[0].numToBuy;

      if((stockParsed+cartNumParsed - numToBuy) < 0){
        res.status(500).json({ status: 500, data: {InCart: cartNumParsed, Stock: stockParsed}, message: "The stock is too low to accomodate this request" });
      }
      else{
        //const itemQuant = await db.collection("Items").updateOne({_id: itemId},{$set:{"numInStock": (stockParsed + cartNumParsed - numToBuy) }});
        const updateResult = await db.collection("Cart").updateOne({"cart.itemId":{$eq: itemId}},{$set:{"cart.$.numToBuy":numToBuy/*, "cart.$.numInStock": (stockParsed + cartNumParsed - numToBuy)*/}});
        
        res.status(200).json({ status: 200, data: {_id: userEmail, itemId: itemId, numToBuy: numToBuy}, message: "Item quantity updated in Cart!" });
      }
    }
    
  }catch(err){
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

module.exports = {updateCart};