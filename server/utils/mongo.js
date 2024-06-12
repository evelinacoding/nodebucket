//Database connection file
//Will not be using mongoose we will be using mongodb driver
"use strict";

const { MongoClient } = require("mongodb")

const MONGO_URL = 'mongodb+srv://nodebucket_user:secret123@bellevueuniversity.8vzftv7.mongodb.net/?retryWrites=true&w=majority&appName=BellevueUniversity'

const mongo = async (operations, next) => {
  try {
    console.log("Connecting to the database...");

    const client = await MongoClient.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const db = client.db("nodebucket");
    console.log("Connected to the database!")

    await operations(db);
    console.log("Operation was successful!");

    client.close();
    console.log("Disconnected from the database.");

  } catch (err) {
    const error = new Error("Error connecting to the database:", err);
    error.status = 500;

    console.error("Error connecting to the database:", err);
    next(error);
  }
}

module.exports = { mongo };