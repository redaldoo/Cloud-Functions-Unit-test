const { update, uploadImg } = require("./requests");
const { switchStatus, switchStatusResponse } = require("../middleware/statusRes");
const { deletePic, deletePdf, deleteBckgrndPic, deleteBckgrndPicMarquesCategories } = require("./autoUpdate");

exports.uploadFiles = async (file, PathStorage) => {
  return await switchStatus(await uploadImg(file, PathStorage, file.imageFileName));
};

exports.uploadMultipleFiles = async (files, PathStorage) => {
  let uploadMultiple = [];
  let i = 0;
  while (i < files.length) {
    uploadMultiple.push(await switchStatus(await uploadImg(files[i], PathStorage, files[i].imageFileName)));
    i++;
  }
  return uploadMultiple;
};

exports.updateUploadFiles = async (Type, file, PathStorage) => {
  await deletePic(Type);
  return await switchStatus(await uploadImg(file, PathStorage, file.imageFileName));
};

exports.updateUploadPdf = async (Type, file, PathStorage) => {
  await deletePdf(Type, file.imageFileName.replace("pdf_", ""));
  return await switchStatus(await uploadImg(file, PathStorage, file.imageFileName));
};

exports.updateUploadMultipleFiles = async (Type, files, PathStorage) => {
  await deleteBckgrndPic(Type);
  let uploadMultiple = [];
  let i = 0;
  while (i < files.length) {
    uploadMultiple.push(await switchStatus(await uploadImg(files[i], PathStorage, files[i].imageFileName)));
    i++;
  }
  return uploadMultiple;
};

exports.updateUploadMultipleFilesMarquesCategories = async (Type, files, PathStorage) => {
  await deleteBckgrndPicMarquesCategories(Type);
  let uploadMultiple = [];
  let i = 0;
  while (i < files.length) {
    uploadMultiple.push(await switchStatus(await uploadImg(files[i], PathStorage, files[i].imageFileName)));
    i++;
  }
  return uploadMultiple;
};
