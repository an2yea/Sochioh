const mongoose = require("mongoose");
const env = require("./environment");
mongoose.connect('mongodb+srv://Abcd:Ananya1123*@cluster0.psdtd.mongodb.net/<dbname>?retryWrites=true&w=majority');  //this link isnt added yet // localhost hata diya replacement ni daaliok..online atlas op abh..i
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

//yha aapne once ko open ..open ko once likha tha
db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports= db;