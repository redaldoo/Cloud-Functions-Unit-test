const { update, readAll, readOne, deleteOne, login, decodeToken } = require("../../common/requests");

const { validateUserData, reduceUserData, compteVerification, emailVerification, validateLoginData, testCurrentUser } = require("../reducers/auth");

const { deletePic } = require("../../common/autoUpdate");
const { switchStatus } = require("../../middleware/statusRes");
const { db } = require("../../../utils/admin");

const { handleReadOneCompte } = require("../../ec/comptes/handlers/comptes");
const PathStorage = "users";
const { updateUploadFiles } = require("../../common/upload");

//LOG ONE
exports.handleLogin = async (content) => {
  const { valid, errors } = validateLoginData(content);
  if (!valid) return switchStatus({ status: 400, message: errors });
  content.email = content.email.toLowerCase();
  const loginResult = await login(content);
  let response = {};
  if (loginResult.status !== 200) {
    return switchStatus(loginResult);
  } else {
    const decodedToken = await decodeToken(loginResult.message);
    response.token = loginResult.message;
    response.status = decodedToken.status;
    response.user = decodedToken.message;
    return switchStatus({ status: response.status, message: response });
  }
};

//Auto connect
exports.handleAutoConnect = async (token) => {
  let response = {};
  if (token === "") {
    return switchStatus({ status: 400, message: "NoToken" });
  } else {
    await testCurrentUser();
    const decodedToken = await decodeToken(token);
    response.token = token;
    response.status = decodedToken.status;
    response.user = decodedToken.message;
    return switchStatus({ status: response.status, message: response });
  }
};
