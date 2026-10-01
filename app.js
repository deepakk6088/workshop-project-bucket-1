
const express = require('express');
const fs =require('fs/promises');
const path = require('path');

const PORT = 3000;
const filePath = path.join(__dirname,"db.json")
const app = express();



let cache = {};


async function readData(){
    let data = await fs.readFile(filePath,'utf-8')
    return JSON.parse(data)
}

async function delayReadData() {
    await new Promise((resolve,reject)=>{
      setTimeout(resolve,1500)
    })
    return await readData();
}
 
 
// app.get('/products', async (req, res) => {
//     try{
//        let products = await delayReadData()
//     res.json(products)
   
//     }catch(err){
//         console.log(err)
//     }
    
// });

app.get('/products', async (req, res) => {
    let key = req.url
    let value = cache[key]
    // res.json(products);
    try {

    if(value){
        return res.json(value)
    }
let products = await delayReadData()
cache[key]= products;
res.json(products);
    } catch (err) {
        console.log(err);
    }
});

app.get('/products/:id', async (req, res) => {
        let key = req.url
    let value = cache[key]
    try{
        if(value){
            return res.json(value)
        }
    const products = await delayReadData();
    const id = Number(req.params.id);
    const product = products.find((product) => product.id === id);
    cache[key]= product;
    res.json(product);
    }catch(err){
        console.log(err)
    }
});


 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// let chache = {}
//keys="/products"--[]
//"products/1"---{}