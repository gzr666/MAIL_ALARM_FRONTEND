const express = require("express");
const router = express.Router();
const appData = require("./../config/config");
const mongoose = require("mongoose");
const Korisnik = require("../models/korisnik");
const hasher = require("../config/hasher");
const jwt = require("jsonwebtoken");

let korisnikData = {};


//spojimo se na mongodb
mongoose.Promise = global.Promise;
mongoose.connect(appData.dbString,function(err){

        if(err)
        {
            console.log("error conencting MongoDB")
        }
        else{
            console.log("Successfully conencted to MongoDB");
        }

});





//logiranje korisnika(provjera emaila i passworda + kreiranje jwt)
router.post("/login",function(req,res){

    //za login cemo POST email + password

    var korisnikData = {
        email:req.body.email,
        password:req.body.password
    };

    console.log(korisnikData);
      

    Korisnik.findOne({email:korisnikData.email},function(err,korisnik){

            if(err)
            {
                res.status(404).json("error accessing db...")
            }
            else
            {

                if(!korisnik)
                {
                    res.status(404).json("No such user in db...")
                }
                else
                {
                    hasher.getPass(korisnikData.password,korisnik.password,function(err,data){

                        if(err)
                        {
                            res.status(500).json("Server error....")   
                        }
                        else{

                                //checkirajmo password
                                if(data)
                                {
                                        //ako je pass u redu kreirajmo payload i jwt

                                        let payload = {
                                            	subject:{
                                                    userID: korisnik._id,
                                                    roles:korisnik.roles
                                                }

                                        };

                                        let token = jwt.sign(payload,appData.jwtSecret);

                                     res.status(200).json(token)   
                                }
                                else{
                                    res.status(401).json("wrong password")  
                                }

                        }


                    });
                }
            }


    })


});


//nezasticena ruta
router.get("/",function(req,res){
    
            res.send("api works");    
    
    });




// provjera tokena- http authorization headers
function verifyToken(req,res,next)
{
    //provjera da li je token uopce poslan u headeru
    if(!req.headers.authorization)
    {
        return res.status(401).json("Unauthorized request....");
    }

    //dohvatimo token iz headera
    let token = req.headers.authorization.split(" ")[1];

    if(token==="null")
    {
        return res.status(401).json("Unauthorized request....");
    }

    //provjerimo da li je token pravi
    jwt.verify(token,appData.jwtSecret,function(err,payload){

            if(err)
            {
                return res.status(401).json("Unauthorized request....");  
            }
            else
            {
                req.verifiedUser = payload.subject;
                
                    next()
            }


    });
    

    

   

}





//dohvati sve korisnike iz baze

router.get("/korisnici",verifyToken,function(req,res){

    Korisnik.find({})
    .exec(function(err,korisnici){

            if(err)
            {
                res.status(500).json("error");
            }
            else{
                res.json(korisnici);
            }

    })


});

//dohvati korisnika po id-u
router.get("/korisnici/:id",function(req,res){
    
        Korisnik.findById(req.params.id)
        .exec(function(err,korisnik){
    
                if(err)
                {
                    res.status(500).json("error");
                }
                else{

                    hasher.getPass("sabbath66",korisnik.password,function(err,check){

                            console.log(check);


                    })

                    res.json(korisnik);
                }
    
        })
    
    
    });


  //dodaj novog korisnika(POST)
  router.post("/korisnici",function(req,res){

    var korisnik = new Korisnik();
   // korisnik = req.body;
    korisnik.ime = req.body.ime;
    korisnik.email = req.body.email;
    korisnik.subsystem = req.body.subsystem;
    korisnik.prioritet1 = req.body.prioritet1;
    korisnik.prioritet2 = req.body.prioritet2;
    korisnik.prioritet3 = req.body.prioritet3;
    korisnik.roles = req.body.roles;

    korisnik.save(function(err,insertedKorisnik){

        if(err)
        {
            res.status(500).json("error");
        }
        else{
            res.json(insertedKorisnik);

        }

    });


  });  


  //update korisnika(PUT)
  router.put("/korisnici/:id",function(req,res){
    
        Korisnik.findByIdAndUpdate(req.params.id,
        {
                //drugi parametar gdje radimo update objekta
                $set:{
                    ime:req.body.ime,
                    email:req.body.email,
                    subsystem:req.body.subsystem,
                    prioritet1:req.body.prioritet1,
                    prioritet2:req.body.prioritet2,
                    prioritet3:req.body.prioritet3,
                    roles:req.body.roles

                }

        },
        {
            new:true
        },function(err,updatedKorisnik){
    
            if(err)
            {
                res.status(500).json("error");
            }
            else{
                res.json(updatedKorisnik);
    
            }
    
        });
    
    
      });  


      //brisanje korisnika
      router.delete("/korisnici/:id",function(req,res){
        
            Korisnik.findByIdAndRemove(req.params.id,function(err,deletedkorisnik){
        
                    if(err)
                    {
                        res.status(500).json("error");
                    }
                    else{
                        res.json(deletedkorisnik);
                    }
        
            })
        
        
        });

module.exports = router;