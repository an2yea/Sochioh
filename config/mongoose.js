const mongoose = require("mongoose");
const env = require("./environment");
mongoose.connect('mongodb+srv://Abcd:Ananya1123*@cluster0.psdtd.mongodb.net/<dbname>?retryWrites=true&w=majority');  //this link isnt added yet // localhost hata diya replacement ni daaliok..online atlas op abh..i
//I created the cluster kal, i am lost ...koi nh..me krta hu//aapne heroku download kr li ?yes yes 
const db = mongoose.connection;//project mein bhi added hai..nh samjhe 

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

//yha aapne once ko open ..open ko once likha tha
db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports= db;
//kuchh user create kijiye //local host pe ??//localhost kiuye didn't get you