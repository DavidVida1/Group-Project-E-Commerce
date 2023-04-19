const { MongoClient, ObjectId } = require("mongodb");
const data = require("./data/items.json");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport2 = async () => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("GroupProject");
     const collection = db.collection("BodyLocation");
    //This part gets the body key from the data.json and sends it to the bodylocation collection //
     const uniqueBodyLocations = [...new Set(data.map(({ body_location }) => body_location))];
// I used new set to get back a new set object values with the unique values.
//meaning, it prevents the array from having "wrist" twice//
     const documents = uniqueBodyLocations.map((body_location) => ({ name: body_location }));

     const result1 = await collection.insertMany(documents);

     console.log(
       `${result1.insertedCount} documents were inserted into the collection`
     );
    // This part gets the category key from the data.json and sends it to the Categories collection //
      const categoryCollection = db.collection("Categories");
      const Uniquecategories = [...new Set(data.map(({ category}) => category))];

      const categoryDocuments = Uniquecategories.map((category) => ({ category}))

      const result2 = await categoryCollection.insertMany(categoryDocuments);
      console.log(
        `${result2.insertedCount} documents were inserted into the collection`
     );
    // // This part gets the price key from the data.json and sends it to the Prices collection //
     const PriceCollection = db.collection("Prices");
     const UniquePrices = [...new Set(data.map(({price}) => price))];
     const PriceDocuments = UniquePrices
     // At price.replace, the expression /[^0-9.]/g, '' replaces non numerical values with an empty string, 
     //before the data was "$7.99", the expression converts it an empty string and returns "7.99"//
     .map(price => ({price, parsedPrice: parseInt(price.replace(/[^0-9.]/g,''))}))
     .sort((a,b) => a.parsedPrice - b.parsedPrice)
     // the sort method makes it so the values start from lowest to greatest//
     .map(({ price }) => ({ price}))
    
     const result3 = await PriceCollection.insertMany(PriceDocuments);
     console.log(
       `${result3.insertedCount} documents were inserted into the collection`
     );
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

batchImport2();
