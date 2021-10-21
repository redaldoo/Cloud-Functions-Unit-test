const { handleLogin, handleAutoConnect } = require("../handlers/auth");

const { switchStatusResponse } = require("../../middleware/statusRes");

// Login
exports.login = async (req, res) => {
  switchStatusResponse(await handleLogin(req.body), res);
};

// Login
exports.autoConnect = async (req, res) => {
  switchStatusResponse(
    await handleAutoConnect(req.headers["x-auth-token"]),
    res
  );
};
