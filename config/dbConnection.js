const { MongoClient } = require("mongodb")

let url;
let dbName;

url = process.env.DATABASE_URL;
dbName = "chilldatabase"

const client = new MongoClient(url, {useUnifiedTopology: true, useNewUrlParser: true})
let _db;
let connection;

async function connectToDbServer() {
    try {
        connection = await client.connect();
        _db = client.db(dbName);
        console.log("Connected to database " + dbName)
    }catch (err) {
        console.log(err)
    }
}

function getDb() { 
    return _db;
}

function getConnection() {
    return connection;
}

async function closeConnection() {
    try{
        await client.close();
    }catch{
        console.log("Can't close connection");
    }
}

module.exports = {connectToDbServer, getDb, getConnection,closeConnection}
