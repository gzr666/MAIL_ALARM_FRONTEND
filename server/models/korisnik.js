const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//kreirajmo klasu za korisnika

const korisnikSchema = new Schema({

        ime:String,
        email:String,
        password:String,
        subsystem:String,
        prioritet1:Boolean,
        prioritet2:Boolean,
        prioritet3:Boolean,
        roles:[String]

});

//exportirajmo model korisnika
module.exports = mongoose.model("korisnik",korisnikSchema,"korisnici");
