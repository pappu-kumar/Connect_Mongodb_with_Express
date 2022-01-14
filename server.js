const express = require('express');

const app = express();
const PORT =  3000

// MongoDB setup
const connectionURL = "mongodb://localhost:27017/ecom";
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
let db;

(async function(){
    try{
        const client = await MongoClient.connect(connectionURL);
        db = client.db('ecom')
    } catch(err){
        throw err
    }
})();

// home page request from server
app.get('/',async (req,res)=>{
    // db.products.find()     --query to  find data from database
    try{
        const result = await db.collection('products').find().toArray()
         res.send(result);
    } catch(err) {
        throw err
    }
    console.log('request from server for home page!')
})

// insert data request to data base
app.get('/insert',async (req,res)=>{
    // db.products.insert()     --query to  \insert data from database
    // 61dfdc882bafc73b5b54ec0c
    try{
        const result = await db.collection('products').insert({
            name: 'item by express',
            price: 000
        })
         res.send(result);
    } catch(err) {
        throw err
    }
    console.log('request for server to insert data!')
})

// delete data request to data base
app.get('/delete',async (req,res)=>{
    // db.products.delete()     --query to  delete data from database
    // 61dfdc882bafc73b5b54ec0c
    try{
        const result = await db.collection('products').deleteOne({_id: ObjectId('61de815a7d911a1a64276823')})
         res.send(result);
    } catch(err) {
        throw err
    }
    console.log('request for server to delete data!')
})

app.listen(PORT, ()=>{
    console.log(`server is listening... ${PORT}`);
})