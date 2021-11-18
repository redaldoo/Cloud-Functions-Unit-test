const {
  handleCreateUser,
  handleUpdateUser,
  handleReadAllUser,
  handleReadOneUser,
  handleDeleteOneUser,
} = require("../handlers/users");

const { switchStatusResponse } = require("../../../middleware/statusRes");

// CREATE NEW
exports.create = async (req, res) => {
  console.log(req.body)
  const response = await handleCreateUser(req.body);
  if (response.status === 201) {
    return res
      .status(201)
      .json({ message: response.message, token: response.token });
  } else {
    return switchStatusResponse(response, res);
  }
};

// GET ALL
exports.readAll = async (req, res) => {
  switchStatusResponse(await handleReadAllUser(req.body), res);
};

// UPDATE ONE
exports.update = async (req, res) => {
  id = req.params.id;
  let content = {
    files: req.files,
    data: req.body,
  };
  switchStatusResponse(await handleUpdateUser(content, id), res);
};

// GET One
exports.readOne = async (req, res) => {
  id = req.params.id;
  switchStatusResponse(await handleReadOneUser(id), res);
};

// DELETE ONE
exports.remove = async (req, res) => {
  id = req.params.id;
  switchStatusResponse(await handleDeleteOneUser(id), res);
};
