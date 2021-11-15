
//Validator
const isEmpty = (string) => {
    return string.trim() === "";
  };
  
  exports.validateProductData = (data) => {
    let errors = {};
  
    if (isEmpty(data.name)) errors.name = "Must not be empty";
    if (isEmpty(data.description)) errors.description = "Must not be empty";
    if (isEmpty(data.richDescription)) errors.richDescription = "Must not be empty";
    if (isEmpty(data.image)) errors.image = "Must not be empty";
    if (isEmpty(data.brand)) errors.brand = "Must not be empty";
    if (isEmpty(data.price)) errors.price = "Must not be empty";
    if (isEmpty(data.countInStock)) errors.countInStock = "Must not be empty";
  
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false,
    };
  };
  
  exports.reduceProductData = (data) => {
    let productDetails = {};
  
    if (!isEmpty(data.name.trim())) {
      productDetails.name = data.name;
    }
    if (!isEmpty(data.description.trim())) {
      productDetails.description = data.description;
    }
    if (!isEmpty(data.image.trim())) {
      productDetails.image = data.image;
    }
      if (!isEmpty(data.brand.trim())) {
      productDetails.brand = data.brand;
    }
      if (!isEmpty(data.price.trim())) {
      productDetails.price = data.price;
    }
      if (!isEmpty(data.countInStock.trim())) {
      productDetails.countInStock = data.countInStock;
    }
  
    return productDetails;
  };