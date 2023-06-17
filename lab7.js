const express = require('express')
const app = express()
const port = 3000 
app.use(express.json());
const bcrypt = require('bcrypt')

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });

const { MongoClient} = require('mongodb');
const uri = "mongodb+srv://ElvinLee:1234567890@elvindata.qte1ayi.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {    
    await client.connect();
    console.log("Connected to server");

}

  app.get("/find", async (req, res) => {
    let user = await client.db("lab7").collection("lab7");
    let data = req.body
    let result = await user.find({"username":data.username}).next() // next () ...
    res.send(result);
  });

  app.post("/insert", async (req, res) => {
    let user = await client.db("lab7").collection("lab7");
    let data = req.body;
    const hashpass = await bcrypt.hash(data.password,10);

    let result = await user.insertOne({"username":data.username,"password":hashpass,"age":data.age});
    res.send(result);

  });

  app.patch("/comment", async (req, res) => {
    let user = await client.db("lab7").collection("lab7");
    let data = req.body;
    let result = await user.updateOne({"username" : data.username },{ $set: {"age": data.age }});
    res.send(result);
  });

  app.delete("/deleted", async (req, res) => {
    let data = req.body;
    const user = await client.db("lab7").collection("lab7");
    let result = await user.deleteOne({ "username": data.username  });
    res.send(result);
  });
 
  run().catch(console.dir);

 
 

  