const { db } = require("../../utils/admin");
const express = require("express");
const {productCreationValidators} = require ("../reducer/products")
const { body , validationResult } = require('express-validator');
const bodyParser = require('body-parser');

exports.readAll = async (req, res) => {
    try {
        const productsRef = db.collection('products');
        let result = [];
            const snapshot = await productsRef.get();
            snapshot.forEach(doc => {
              const selectedItem = {
                id: doc.id,
                name: doc.data().name,
                brand: doc.data().brand,
                image: doc.data().image,
                countInStock: doc.data().countInStock,
                category: doc.data().category,
                price: doc.data().price,
                richDescription: doc.data().richDescription,
                description: doc.data().description


            };
            result.push(selectedItem);
            });
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
  };
exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
    }
    try {
       
          await db.collection('products').doc()
              .create({         
                  name: req.body.name,
                  description: req.body.description,
                  richDescription: req.body.richDescription,
                  image: req.body.image,
                  brand: req.body.brand,
                  price: req.body.price,
                  countInStock: req.body.countInStock,
                  category: req.body.category
                  
                  
                });
            
          return res.status(200).send();
        
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        };
    };

exports.readOne = async (req, res) => {
  try {
        
    const document = db.collection('products').doc(req.params.id);

    let product = await document.get();

    let response = product.data();

    return res.status(200).send(response);

} catch (error) {

    console.log(error);

    return res.status(500).send(error);

}


}
exports.update = async (req, res) => {
  try {
    const document = db.collection('products').doc(req.params.id);
    await document.update({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        countInStock: req.body.countInStock,


    });
    return res.status(200).send();
} catch (error) {
    console.log(error);
    return res.status(500).send(error);
}
}
exports.remove = async (req, res) => {
  try {
    const document = db.collection('products').doc(req.params.id);
    await document.delete();
    return res.status(200).send();
} catch (error) {
    console.log(error);
    return res.status(500).send(error);
}
}