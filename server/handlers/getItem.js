"use strict";

const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const { v4: uuidv4 } = require("uuid");
 // This function /endpoint handler gets you a single item from the list of items in the database.
 const getItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const itemId = parseInt(req.params.item);

  try {
    await client.connect();
    const db = client.db("GroupProject");
    const result = await db.collection("Items").findOne({ _id: itemId });

    if (!result) {
      res.status(404).json({
        status: 404,
        data: null,
        message: `Item with ID ${itemId} does not exist`,
      });
    } else {
      res.status(200).json({
        status: 200,
        data: result,
        message: "Item found",
      });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({
      status: 500,
      data: null,
      message: err.message,
    });
  } finally {
    client.close();
  }
}








module.exports = {getItem};