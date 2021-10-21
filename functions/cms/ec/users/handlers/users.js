const { update, readAll, readOne, deleteOne, createUser, deleteUserId } = require("../../../common/requests");

const { validateUserData, reduceUserData, emailVerification } = require("../reducers/users");

const { deletePic } = require("../../../common/autoUpdate");
const { switchStatus } = require("../../../middleware/statusRes");
const { db } = require("../../../../utils/admin");
const Users = db.collection("users")

const PathStorage = "users";
const { updateUploadFiles } = require("../../../common/upload");

//CREATE
exports.handleCreateUser = async (content) => {
  const { valid, errors } = validateUserData(content);
  if (!valid) return switchStatus({ status: 400, message: errors });
  let dataReduced = await reduceUserData(content);
  // Verify User email
  const verificationEmail = await emailVerification(dataReduced.email);
  if (!verificationEmail) return switchStatus({ status: 400, message: "Cet email existe déja" });

  return await createUser(dataReduced);
};
//READ ALL
exports.handleReadAllUser = async () => {
  return switchStatus(await readAll(Users));
};
//READ ONE
exports.handleReadOneUser = async (id) => {
  return switchStatus(await readOne(Users.doc(id)));
};
//UPDATE ONE
exports.handleUpdateUser = async (content, id) => {
  let dataReduced = reduceUserData(content.data);
  if (content.files.length > 0) {
    const uploadedFiles = switchStatus(await updateUploadFiles(Users.doc(id), content.files[0], PathStorage));
    if (uploadedFiles.status === 202) {
      dataReduced.imgUrl = uploadedFiles.message;
      dataReduced.imgPath = uploadedFiles.imgPath;
    }
  }
  return await update(Users.doc(id), dataReduced);
};
//DELETE ONE
exports.handleDeleteOneUser = async (id) => {
  await deletePic(Users.doc(id));
  await deleteUserId(id);
  return switchStatus(await deleteOne(Users.doc(id)));
};
