const { MongoClient } = require('mongodb');
require("dotenv").config();

const uri = process.env.MOONGOOSE_URI;
const client = new MongoClient(uri);

const connection = async () => {
    try {
        await client.connect();
        console.log('Connection Successful!');
    } catch (err) {
        console.log('Not connected!');
        console.log(err);
    }
}

module.exports = { client, connection };