// PLACEHOLDER IF TIME ALLOWS

/*"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const { v4: uuidv4 } = require("uuid");

//this function deletes a specific cart item 
const deleteBoughtItem = async (req,res) => {
    const client = new MongoClient(MONGO_URI,options);
    const _id = req.body._id;
    const unparsedId = req.body.itemId;
    const itemId = parseInt(unparsedId);
    const userEmail = "JimmyBuyMore@realcustomer.ca"; 

    try{
        await client.connect();
        const db = client.db("GroupProject");
        //these variables find the stock value of the item according to its ID
        const stockAmount = await db.collection("Items").find({_id: itemId}).project({"_id":0, "name":0, "price":0, "body_location":0, "category":0, "imageSrc":0,"companyId":0}).toArray();
        //we need to check if the item ID exists in the cart, if not, inform the front end
        if((await db.collection("BoughtItems").countDocuments({_id: _id}, {limit:1})) !== 1){
            res.status(500).json({status:500, data: _id , message: `This item ID is not contained in the cart from user: ${userEmail}!`});
        }
        //else we delete the document with the correct item ID and useremail to attribute who needs their document deleted
        else{
            const stockParsed = stockAmount[0].numInStock;
            const result = await db.collection("BoughtItems").deleteOne({_id:_id, userEmail: userEmail});
            const updateQuant = await db.collection("Items").updateOne({_id: itemId}, {$set:{"numInStock": (stockParsed + req.body.numBought)}})
            res.status(200).json({status:200, data: _id , message: "Bought item deleted successfully!"});
        }
    }catch(err){
        console.log(err.stack);
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
};

module.exports = {deleteBoughtItem}; */