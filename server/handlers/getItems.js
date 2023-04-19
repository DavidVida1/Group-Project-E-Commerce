"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const { v4: uuidv4 } = require("uuid");

const getItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("GroupProject");
    const result = await db.collection("Items").find().toArray();
    const data = result.map(item => ({
      _id: item._id,
      name: item.name,
      price: item.price,
      body_location: item.body_location,
      category: item.category,
      imageSrc: item.imageSrc,
      numInStock: item.numInStock,
      companyId: item.companyId
    }));
    res.status(200).json({ status: 200, data, message: "Items list found!" });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = {getItems};