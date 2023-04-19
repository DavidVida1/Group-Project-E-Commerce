const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

//These variables represent the two .json of data that needs to be imported on Mongodb
const companyData = require("./data/companies.json")
const itemData = require("./data/items.json")

// This function takes the objects from both companies.json and items.json and sends them to the Mongodb GroupProject database in their respective collection
const batchImport = async () =>{
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        const db = client.db("GroupProject");
        const companyList = await db.collection("Companies").insertMany(companyData);
        const itemList = await db.collection("Items").insertMany(itemData);
    }catch(err){
        console.log(err.stack);
    }
    client.close();
}

batchImport();