import 'dotenv/config'
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@city.mgpqw.mongodb.net/?retryWrites=true&w=majority&appName=City`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
}


async function getItem(params) {
    const item = await client.db("Cities").collection('Cities').find().limit(-1).skip(6).next()
    return item
}

await run()
getItem()