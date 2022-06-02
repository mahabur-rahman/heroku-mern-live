const mongoose = require("mongoose");
const DB = process.env.DATABASE;

// CONNECT WITH DB
const connectedDB = async () => {
  try {
    const conn = await mongoose.connect(DB);
    console.log(`Mongodb connected : ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(`No connection : ${err}`.red.underline);
  }
};

module.exports = connectedDB;
