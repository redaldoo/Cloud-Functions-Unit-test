const { body , validationResult } = require('express-validator');

const productCreationValidators = [
    body('name').notEmpty().withMessage("Name required!"),
    body('description').notEmpty().withMessage("Name required!"),
    body('richDescription').notEmpty().withMessage("Name required!"),
    body('image').notEmpty().withMessage("Name required!"),
    body('brand').notEmpty().withMessage("Name required!"),
    body('price').isFloat().withMessage("must be int !"),
    body('countInStock').notEmpty().withMessage("Name required!")
   ];