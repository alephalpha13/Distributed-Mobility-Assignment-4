// ----------------------------------
// mongo setup
// ----------------------------------
const mongoose = require("mongoose");

const mongoURL = "mongodb+srv://dbUser1:bernkastel13@cluster0.1zynz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const connectionOptions = {useNewUrlParser: true, useUnifiedTopology: true}


// add your table schemas
const Schema = mongoose.Schema

const ItemSchema = new Schema({
   name:String,
   rarity:String,
   description:String,
   goldPerTurn:Number

})
const Item = mongoose.model("items_table", ItemSchema)



// ----------------------------------
// express setup
// ----------------------------------
const express = require("express");
const app = express();
app.use(express.json())
const HTTP_PORT = process.env.PORT || 8080;

// ----------------------------------
// Url endpoints
// ----------------------------------
// GET ALL
app.get("/api/items", (req, res) => {
    // 1. search the database for itemss and return them
    Item.find().exec().then(
        (results) => {
            console.log(results)
            res.status(200).send(results)
        }
    ).catch(
        (err) => {
            console.log(error)
            res.status(500).send("Error when getting items from database.")
        }
    )
    
})

// GET ONE BY ID
// localhost:8080/items/34234324234234
// app.get("/api/items/:sid", (req,res) => {
//     // 1. Determine which stduent the user wants
//     // - by looking at the url parameters
    
//     console.log(`Searching for: ${req.params.sid}`)

//     // 2. Then you make the query to the database
//     // --  this is mongoose syntax, its not express, its not javascript
//     Item.findById(req.params.sid).exec()
//         .then(
//             (result) => {
//                 console.log(`Result from database: `)
//                 console.log(result)
//                 if (result === null) {
//                     console.log("record not found")
//                     // ???? what are you going to send back if the record was not found
//                     const msg = {
//                         statusCode:404,
//                         msg: "Record not found"
//                     }
//                     res.status(404).send(msg)
//                 }
//                 else {
//                     console.log("person found")                    
//                     res.send(results)
//                 }
                
//             }
//         ).catch(
//             (err) => {
//                 console.log(`Error`)
//                 console.log(err)
//                 const msg = {
//                     statusCode:500,
//                     msg: "Error when getting item from database."
//                 }
//                 res.status(500).send(msg)

//             }
//         )
    

// })

// GET BY NAME
// localhost:8080/items/Peter
app.get("/api/items/:name", (req,res) => {
    // 1. Determine which stduent the user wants
    // - by looking at the url parameters
    
    console.log(`Searching for: ${req.params.name}`)

    // 2. Then you make the query to the database
    // --  this is mongoose syntax, its not express, its not javascript
    Item.findOne({name: req.params.name}, function(err,obj) { console.log(obj); }).exec()
    //Item.findById(req.params.name).exec()
        .then(
            (result) => {
                console.log(`Result from database: `)
                console.log(result)
                if (result === null) {
                    console.log("record not found")
                    // ???? what are you going to send back if the record was not found
                    const msg = {
                        statusCode:404,
                        msg: "Record not found"
                    }
                    res.status(404).send(msg)
                }
                else {
                    console.log("item found")                    
                    res.send(result)
                }
                
            }
        ).catch(
            (err) => {
                console.log(`Error`)
                console.log(err)
                const msg = {
                    statusCode:500,
                    msg: "Error when getting item from database."
                }
                res.status(500).send(msg)

            }
        )

})

// INSERT 
app.post("/api/items", (req, res) => {

    // 1. what did the client send us
    // - what data does the client want us insert into the database
    console.log("I received this from the client:")
    console.log(req.body)
    
    // 2. Take that information and CREATE someone in your database!
    // - mongoose

    if(req.body.name != null && req.body.rarity != null){
        Item.create(req.body).then(
            (result) => {
                //javascript
                console.log("Create success!")
                console.log(result)
                // express
                res.status(201).send("Insert success!")
            }
        ).catch(
            (err) => {
                console.log(`Error`)
                console.log(err)
                const msg = {
                    statusCode:500,
                    msg: "Error when getting items from database."
                }
                res.status(500).send(msg)
            }
        )
    }else{
        console.log("Item missing rarity/name!")
        // express
        res.status(404).send("Item to be inserted is missing rarity/name!")
    }
    
})


// UPDATE BY ID
app.put("/api/items/:item_id", (req,res) => {

    // // 1. you need a way to retrieve which record you want to update
    // // (id)

    // console.log(`Person wants to update: ${req.params.item_id}`)
    
    // // 2. you need a way to figure out WHAT should be updated
    // console.log(`What should the new updated data be?`)
    // console.log(req.body)




    // // 3. Call the databse and make the update

    // // parameter 1: The record you want to update (it will search the db for the person with the specified id)
    // // parameter 2: A JSON object containing the information you want to update your record to    
    // // parameter 3: {new:true} --> Tells Mongo to send you back a copy of the updated record
    // Item.findOneAndUpdate({_id:req.params.item_id},req.body,{new:true}).exec().then(
    //     (updatedItem) => {
    //         if (updatedItem === null) {
    //             console.log("Could not find the item to update.")   
    //             res.status(404).send("Could not find the item to update.")
    //         }
    //         else {
    //             console.log(updatedItem)
    //             res.status(200).send(updatedItem)
    //         }
        
    //     }
    // ).catch(
    //     (err) => {
    //         console.log(err)   
    //         res.status(500).send("Error with the update")  
    //     }
    // )

    res.status(501).send("Not implemented")  
    
})

// DELETE BY ID
app.delete("/api/items/:item_name", (req,res) => {
    

    //@TODO:
    //1. Get the name of the item you want to delete from the request params
    console.log(`Searching for: ${req.params.item_name}`)

    //2. Send the name to the database
    //- Use the mongoose Item.findByIdAndDelete
    Item.findOne({name: req.params.item_name}, function(err,obj) { console.log(obj); }).exec()
    //Item.findById(req.params.name).exec()
        .then(
            (result) => {
                console.log(`Result from database: `)
                console.log(result)
                if (result === null) {
                    console.log("record not found")
                    // ???? what are you going to send back if the record was not found
                    const msg = {
                        statusCode:404,
                        msg: "Record not found"
                    }
                    res.status(404).send(msg)
                }
                else {
                    Item.findOneAndDelete({name: req.params.item_name}, function(err,obj) { console.log(obj); }).exec()
                    //Item.findByIdAndDelete().exec()
                    .then(
                        (deletedItem) => {
                                console.log(deletedItem)                       
                        }
                    ).catch(
                        (err) => {
                            console.log(err)
                        }
                    )
                    console.log("item found")                    
                    res.status(200).send("Item Succesfully Deleted!")
                }
                
            }
        ).catch(
            (err) => {
                console.log(`Error`)
                console.log(err)
                const msg = {
                    statusCode:500,
                    msg: "Error when getting item from database."
                }
                res.status(500).send(msg)

            }
        )
 
})


// ----------------------------------
// start server
// ----------------------------------
const onHttpStart = () => {
    console.log(`Server has started and is listening on port ${HTTP_PORT}`)
}


// 1. connect to the databas
// 2. AFTER you successfully connect, that you start he expres server
mongoose.connect(mongoURL, connectionOptions).then(
    () => {
         console.log("Connection success")
         app.listen(HTTP_PORT, onHttpStart); 
    }
 ).catch(
    (err) => {
        console.log("Error connecting to database")
        console.log(err)
    }
)