const mongoose = require('mongoose');
const env = require('dotenv').config();

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true });

const schema = new mongoose.Schema({
    original_url: String,
    short_url: Number
});

const connected = mongoose.model("UrlModel", schema);

exports.connected = connected