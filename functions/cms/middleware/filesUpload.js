module.exports = {
  filesUpload: (req, res, next) => {
    if (Object.keys(req.headers).includes("content-type") && req.headers["content-type"].startsWith("multipart/form-data")) {
      const Busboy = require("busboy");
      const path = require("path");
      const os = require("os");
      const fs = require("fs");
      const fields = {};
      const files = [];
      const fileWrites = [];
      const busboy = new Busboy({
        headers: req.headers,
        limits: {
          fileSize: 10 * 1024 * 1024,
        },
      });
      busboy.on("field", (key, value) => {
        fields[key] = value;
      });
      busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
        if (
          mimetype !== "image/jpeg" &&
          mimetype !== "image/png" &&
          mimetype !== "image/jpg" &&
          mimetype !== "application/pdf" &&
          !mimetype.startsWith("image/svg")
        ) {
          return res.status(400).json({ message: "Wrong file type submitted" });
        }
        const imageExtension = filename.split(".")[filename.split(".").length - 1];
        const imageFileName = `${Date.now()}-${Math.round(Math.random() * 1000)}.${imageExtension}`;
        const filepath = path.join(os.tmpdir(), imageFileName);
        const writeStream = fs.createWriteStream(filepath);
        file.pipe(writeStream);
        fileWrites.push(
          new Promise((resolve, reject) => {
            file.on("end", () => writeStream.end());
            writeStream.on("finish", () => {
              fs.readFile(filepath, (err, buffer) => {
                const size = Buffer.byteLength(buffer);
                if (err) {
                  return reject(err);
                }
                files.push({
                  fieldname,
                  filepath: filepath,
                  imageFileName,
                  originalname: filename,
                  encoding,
                  mimetype,
                  buffer,
                  size,
                });
                try {
                  //   fs.unlinkSync(filepath);
                } catch (error) {
                  return reject(error);
                }
                resolve();
              });
            });
            writeStream.on("error", reject);
          })
        );
      });
      busboy.on("finish", () => {
        Promise.all(fileWrites)
          .then(() => {
            req.body = fields;
            req.files = files;
            next();
          })
          .catch(next);
      });
      busboy.end(req.rawBody);
    } else {
      next();
    }
  },
};
