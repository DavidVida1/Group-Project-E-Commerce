"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

const getBodyLocation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("GroupProject");
    const result = await db.collection("BodyLocation").find().toArray()
    res.status(200).json({status: 200, bodyLocations: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message : "Files not found"})
  }
  client.close();
};

module.exports = { getBodyLocation };
