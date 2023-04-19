"use strict";

const { MongoClient} = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const { v4: uuidv4 } = require("uuid");

//this function adds an item to the cart collection with the user's email address 
const addToCart = async (req,res) => {
  const client = new MongoClient(MONGO_URI,options);

  //since the database uses ints and we might use strings elsewhere, the numbers are all parsed before being used
  const unparsedId = req.body._id;
  const itemId = parseInt(unparsedId);
  const unparsedNumToBuy = req.body.numToBuy;
  const numToBuy = parseInt(unparsedNumToBuy);
  const userEmail = "JimmyBuyMore@realcustomer.ca"; 

  try{
    await client.connect();
    const db = client.db("GroupProject");

    //these variables find the stock, name and price value of the item according to its ID
    const stockAmount = await db.collection("Items").find({_id: itemId}).project({"_id":0, "name":0, "price":0, "body_location":0, "category":0, "imageSrc":0,"companyId":0}).toArray();
    const nameValue = await db.collection("Items").find({_id: itemId}).project({"_id":0, "numInStock":0, "price":0, "body_location":0, "category":0, "imageSrc":0,"companyId":0}).toArray();
    const priceValue = await db.collection("Items").find({_id: itemId}).project({"_id":0, "name":0, "numInStock":0, "body_location":0, "category":0, "imageSrc":0,"companyId":0}).toArray();

    //these variables find if there is already a same itemId & userEmail pair value in the cart
    const idExists = await db.collection("Cart").find({"cart.itemId":{$eq: itemId}}).toArray();
    const userExists = await db.collection("Cart").find({_id: userEmail}).toArray();

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
      res.status(500).json({ status: 500, data: {Buying : numToBuy, Stock: stockAmount[0].numInStock}, message: "The stock is too low to accomodate this request" });
    }
    //we also check if the item exists already in the cart. if it does, we simply update the quantity while checking it does not exceed the total stock, if it doesnt, we add a new object to the array
    else if(userExists.length >0){
      if(idExists.length > 0 ){

        const stockParsed = stockAmount[0].numInStock;
        const nameParsed = nameValue[0].name;
        const priceParsed = priceValue[0].price;
        const idExistsParsed = idExists[0].cart[0].itemId;
        const cartNumParsed = cartItemObject[0].numToBuy

        if(numToBuy > stockAmount[0].numInStock || (stockParsed - cartNumParsed - numToBuy) < 0 ){
          res.status(500).json({ status: 500, data: {Buying : numToBuy, InCart: cartNumParsed, Stock: stockParsed}, message: "The stock is too low to accomodate this request" });
        }
        else{
        const updateResult = await db.collection("Cart").updateOne({"cart.itemId":{$eq: itemId}},{$inc:{/*"cart.$.numInStock": -numToBuy ,*/"cart.$.numToBuy":numToBuy}});
        res.status(201).json({ status: 201, data: {itemId: itemId, name: nameParsed, price: priceParsed, numToBuy: (cartNumParsed + numToBuy), numInStock: stockParsed}, message: "Item quantity updated in Cart!" });
        }
      }
      else{
        const stockParsed = stockAmount[0].numInStock;
        const nameParsed = nameValue[0].name;
        const priceParsed = priceValue[0].price;
        let newSet = {$set:{itemId, name:nameParsed, price: priceParsed, numToBuy, numInStock: stockParsed}};

        const result = await db.collection("Cart").updateOne({"_id":{$eq: userEmail}}, {$addToSet:{"cart":newSet.$set}});
        res.status(201).json({ status: 201, data: {itemId: itemId, name: nameParsed, price: priceParsed, numToBuy: numToBuy, numInStock: stockParsed}, message: "User exists and item added to Cart!" });
      }
    }

    //if all checks pass the cart has a new document with a unique _id
    else{
      const stockParsed = stockAmount[0].numInStock;
      const nameParsed = nameValue[0].name;
      const priceParsed = priceValue[0].price;
      let newSet = {$set:{_id: userEmail, cart: [{itemId, name:nameParsed, price: priceParsed, numToBuy, numInStock: stockParsed}]}};

      const result = await db.collection("Cart").insertOne(newSet.$set);
      res.status(201).json({ status: 201, data: {itemId: itemId, name: nameParsed, price: priceParsed, numToBuy: numToBuy, numInStock: stockParsed}, message: "User does not exist and item added to Cart!" });
    }
    
  }catch(err){
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

module.exports = {addToCart};