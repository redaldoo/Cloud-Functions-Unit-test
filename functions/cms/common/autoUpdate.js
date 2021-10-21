const { readOne, deleteImg } = require("./requests");

exports.deletePic = async (Type) => {
  const resultPic = await readOne(Type);
  if (Object.keys(resultPic.message).includes("imgPath")) {
    deleteImg(resultPic.message.imgPath);
  }
};
