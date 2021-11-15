const { db } = require("../../utils/admin");
const express = require("express");

const { body , validationResult } = require('express-validator');
const bodyParser = require('body-parser');

exports.create = async (req, res) =>{
    try {
        await db.collection('categories').doc()
            .create({
                name: req.body.name
              });   
        return res.status(200).send("Category created succesfully");
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
}
exports.readAll = async (req, res) =>{
  
        try {
            let query = db.collection('categories');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    id: doc.id,
                    name: doc.data().name
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
        const document = db.collection('categories').doc(req.params.id);
        let categorie = await document.get();
        let response = categorie.data();
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

exports.update = async (req, res) => {
    try {
        const document = db.collection('categories').doc(req.params.id);
        await document.update({
            name: req.body.name
        });
        return res.status(200).send(" Category updated succesfully");
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

exports.remove = async (req, res) => {
    try {
        const document = db.collection('categories').doc(req.params.id);
        await document.delete();
        return res.status(200).send("Category deleted succesfully");
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}