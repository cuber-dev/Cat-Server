require('dotenv').config()
const { updateOne , read } = require('./controllers/controller')
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://cuber-dev:testing1234@cluster0.wgkepzu.mongodb.net/'
const dbName = 'appdb';
const collectionName = 'catsCl';

let client;
let db;
let collection
async function connectDB(data) {
  try {
    client = await MongoClient.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true
    });

    db = client.db(dbName);
    collection = db.collection(collectionName)
    
    console.log('-----------------------------')
    console.log('Connected to the database!');
    
    if(data.first){
        console.log('new voter')
        await updateOne(collection,data.first)
        await updateOne(collection,data.second)
        return await read(collection,data.third)
    }else{
        console.log('existing voter')
        return await read(collection,data)
    }               
  } catch (error) {
    console.log('Failed to connect to the database:', error);
  }finally{
    closeDB()
  }
}

async function closeDB() {
  if (client) {
    await client.close();
    
    console.log('Disconnected from the database');
    console.log('-----------------------------')
  }
}

module.exports = {
  connectDB,
};
