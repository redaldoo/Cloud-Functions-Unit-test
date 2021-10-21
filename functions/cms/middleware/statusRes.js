exports.switchStatus = ({ status, message, id, imgPath }) => {
  switch (status) {
    case 200:
      return {
        status: 200,
        message: message,
      };
    case 201:
      return {
        status: 201,
        id: id,
        message: message,
      };
    case 202:
      return {
        status: 202,
        message: message,
        imgPath: imgPath,
      };
    case 204:
      return {
        status: 204,
        message: "NoContent",
      };
    case 400:
      return {
        status: 400,
        message: message,
      };
    case 401: // token expired
      return {
        status: 400,
        message: message,
      };
    case 404:
      return {
        status: 404,
        message: message,
      };
    case 500:
      return {
        status: 500,
        message: message,
      };
    default:
      return {
        status: 500,
        message: message,
      };
  }
};

exports.switchStatusResponse = ({ status, message }, res) => {
  switch (status) {
    case 200:
      return res.status(200).json(message);
    case 201:
      return res.status(201).json(message);
    case 202:
      return res.status(202).json({ message: "Upload effectué avec succès!" });
    case 204:
      return res.status(204).json({ message: "NoContent" });
    case 400:
      return res.status(400).json(message);
    case 401: //token expired
      return res.status(401).json(message);
    case 403:
      return res.status(403).json({ error: "Unauthorized" });
    case 404:
      return res.status(404).json(message);
    case 500:
      return res.status(500).json(message);
    default:
      return res.status(500).json(message);
  }
};
