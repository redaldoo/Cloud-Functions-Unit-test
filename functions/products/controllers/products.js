const { db } = require("../../utils/admin");
const express = require("express");
const { productCreationValidators } = require("../reducer/products");
const { body, validationResult } = require("express-validator");
const bodyParser = require("body-parser");

exports.readAll = async (req, res) => {
  try {
    const productsRef = db.collection("products");
    let result = [];
    let snapshot = productsRef;

    if (req.query.priceFrom) {
      let priceFrom = req.query.priceFrom;
      snapshot = snapshot.where("price", ">=", parseFloat(priceFrom));
    }
    if (req.query.priceTo) {
      let priceTo = req.query.priceTo;
      snapshot = snapshot.where("price", "<=", parseFloat(priceTo));
    }
    if(req.query.priceFrom || req.query.priceTo){
      snapshot = snapshot.orderBy('price');
    }
    if (req.query.category) {
      let category = req.query.category;
      snapshot = snapshot.where("category", "==", category);
    }
    if (req.query.name) {
      let name = req.query.name;
      snapshot = snapshot
        .orderBy("name")
        .startAt(name)
        .endAt(name + "\uf8ff");
    }
   
    snapshot = await snapshot.get();

    snapshot.forEach((doc) => {
      const selectedItem = {
        id: doc.id,
        name: doc.data().name,
        image: doc.data().image,
        category: doc.data().category,
        price: doc.data().price,
        status: doc.data().status,
        richDescription: doc.data().richDescription,
        description: doc.data().description,
        lng: doc.data().lng,
        lat: doc.data().lat,
        user: doc.data().user
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
    await db.collection("products").doc().create({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      // brand: req.body.brand,
      price: parseFloat(req.body.price),
      status: req.body.status,
      category: req.body.category,
      lng: req.body.lng,
      lat: req.body.lat,
      user: req.body.user
    });

    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
exports.readOne = async (req, res) => {
  try {
    const document = db.collection("products").doc(req.params.id);

    let product = await document.get();
    let id = req.params.id;
    let data = product.data()
    let response = {
      id: id,
      ...data
    }
    
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);

    return res.status(500).send(error);
  }
};
exports.update = async (req, res) => {
  try {
    const document = db.collection("products").doc(req.params.id);
    await document.update({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      // brand: req.body.brand,
      price: parseFloat(req.body.price),
      status: req.body.status,
      category: req.body.category,
      lng: req.body.lng,
      lat: req.body.lat,
      user: req.body.user
    });
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
exports.remove = async (req, res) => {
  try {
    const document = db.collection("products").doc(req.params.id);
    await document.delete();
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
