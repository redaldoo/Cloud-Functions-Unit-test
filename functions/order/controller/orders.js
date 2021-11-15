const { db } = require("../../utils/admin");
const express = require("express");

const { body , validationResult } = require('express-validator');
const bodyParser = require('body-parser');

exports.create = async (req, res) =>{
    try {
        await db.collection('order').doc()
            .create({
                refodr: req.body.refodr,
                dateodr : req.body.dateodr,
                priceodr: req.body.priceodr,
                adressodr : req.body.adressodr,
                quantityodr: req.body.quantityodr,
                statusodr : req.body.statusodr
                //listprododr: req.body.listprododr,
                //idUser: req.body.idUser
              });
        return res.status(200).send();
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
}
exports.readAll = async (req, res) =>{
  
    try {
        let query = db.collection('order');
        let response = [];
        await query.get().then(querySnapshot => {
        let docs = querySnapshot.docs;
        for (let doc of docs) {
            const selectedItem = {
                id: doc.id,
                refodr: doc.data().refodr,
                dateodr : doc.data().dateodr,
                priceodr: doc.data().priceodr,
                adressodr : doc.data().adressodr,
                quantityodr: doc.data().quantityodr,
                statusodr : doc.data().statusodr
            };
            response.push(selectedItem);
        }
        });
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

exports.readOne = async (req, res) => {
    try {
        const document = db.collection('order').doc(req.params.id);
        let order = await document.get();
        let response = order.data();    
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

exports.update = async (req, res) => {
    try {
        const document = db.collection('order').doc(req.params.id);
        await document.update({
            refodr: req.body.refodr,
            dateodr : req.body.dateodr,
            priceodr: req.body.priceodr,
            adressodr : req.body.adressodr,
            quantityodr: req.body.quantityodr,
            statusodr : req.body.statusodr
        });
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

exports.remove = async (req, res) => {
    try {
        const document = db.collection('order').doc(req.params.id);
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}