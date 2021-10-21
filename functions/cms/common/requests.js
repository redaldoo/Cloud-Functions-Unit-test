const { switchStatus } = require("../middleware/statusRes");

// Create
exports.create = async (Type, data) => {
  let response = {};
  await Type.add(data)
    .then((doc) => {
      doc.update({ id: doc.id });
      response.status = 201;
      response.id = doc.id;
      response.message = `document ${doc.id} created successfully`;
    })
    .catch((err) => {
      console.error(err);
      response.status = 500;
      response.message = "something went wrong";
    });
  return {
    status: response.status,
    message: response.message,
    id: response.id,
  };
};
// Set
exports.set = async (Type, data) => {
  let response = {};
  await Type.set(data)
    .then((doc) => {
      response.status = 200;
      response.message = `document ${doc.id} created successfully`;
    })
    .catch((err) => {
      console.error(err);
      response.status = 500;
      response.message = "something went wrong";
    });
  return {
    status: response.status,
    message: response.message,
  };
};
// Read All
exports.readAll = async (Type) => {
  let response = {};
  let content = [];
  await Type.get()
    .then((doc) => {
      doc.forEach((element) => {
        content.push({
          ...element.data(),
        });
      });
      response.status = 200;
      response.message = content;
    })
    .catch((err) => {
      console.error(err);
      response.status = 500;
      response.message = "something went wrong";
    });
  return {
    status: response.status,
    message: response.message,
  };
};
// Update
exports.update = async (Type, data) => {
  let response = {};
  await Type.get()
    .then((doc) => {
      if (doc.exists) {
        Type.update(data);
        response.status = 200;
        response.message = `details added successfuly`;
      } else {
        response.status = 404;
        response.message = `document not found`;
      }
    })
    .catch((err) => {
      console.error(err);
      response.status = 500;
      response.message = "something went wrong";
    });
  return {
    status: response.status,
    message: response.message,
  };
};
// Read One
exports.readOne = async (Type) => {
  let response = {};
  await Type.get()
    .then((doc) => {
      if (doc.exists) {
        response.status = 200;
        response.message = doc.data();
      } else {
        response.status = 404;
        response.message = "document not found";
      }
    })
    .catch((err) => {
      console.error(err);
      response.status = 500;
      response.message = "something went wrong";
    });
  return {
    status: response.status,
    message: response.message,
  };
};
// Delete One
exports.deleteOne = async (Type) => {
  let response = {};
  await Type.get()
    .then((doc) => {
      if (!doc.exists) {
        response.status = 404;
        response.message = "document not found";
      } else {
        Type.delete();
        return;
      }
    })
    .then(() => {
      response.status = 200;
      response.message = `document deleted successfully`;
    })
    .catch((err) => {
      console.error(err);
      response.status = 500;
      response.message = "something went wrong";
    });
  return {
    status: response.status,
    message: response.message,
  };
};
//Upload One Image
exports.uploadImg = async (imageToBeUploaded, PathStorage, imageFileName) => {
  const { storage } = require("../../utils/admin");
  const config = require("../../utils/config");
  let response = {};
  await storage
    .upload(imageToBeUploaded.filepath, {
      resumable: false,
      destination: `${PathStorage}/${imageFileName}`,
      metadata: {
        metadata: {
          contentType: imageToBeUploaded.mimetype,
        },
      },
    })
    .then(() => {
      const imgUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${PathStorage}%2F${imageFileName}?alt=media`;
      response = {
        status: 202,
        message: imgUrl,
        imgPath: `${PathStorage}/${imageFileName}`,
      };
    })
    .catch((err) => {
      console.error(err);
      response = {
        status: 500,
        message: err.code,
      };
    });
  return response;
};
//Delete One Image
exports.deleteImg = async (path) => {
  const { storage } = require("../../utils/admin");
  let response = {};
  await storage
    .file(path)
    .get()
    .then(async (file) => {
      if (file) {
        await storage
          .file(path)
          .delete()
          .then(() => {
            response = {
              status: 202,
              message: "Old pic deleted !",
            };
          })
          .catch((err) => {
            console.error(err);
            response = {
              status: 500,
              message: err.code,
            };
          });
      } else {
        response = {
          status: 404,
          message: "document not found",
        };
      }
    })
    .catch((err) => {
      console.error(err);
      response = {
        status: 500,
        message: err.code,
      };
    });
  return response;
};
// Search One by email
exports.searchEmail = async (email) => {
  const { db } = require("../../utils/admin");
  let response = {};
  await db
    .collectionGroup("users")
    .where("email", "==", email)
    .get()
    .then((doc) => {
      if (doc.exists) {
        response.status = 200;
        response.message = doc.data();
      } else {
        response.status = 404;
        response.message = "document not found";
      }
    })
    .catch((err) => {
      console.error(err);
      response.status = 500;
      response.message = "something went wrong";
    });
  return {
    status: response.status,
    message: response.message,
  };
};
// Create Users
exports.createUser = async (userCredentials) => {
  const { fbApp } = require("../../utils/fbApp");
  const { db } = require("../../utils/admin");
  const config = require("../../utils/config");
  const User = db.collection("users");
  const noImg = `noImg.png`;
  let response = {};
  let token, idUser;
  await fbApp
    .auth()
    .createUserWithEmailAndPassword(userCredentials.email, userCredentials.password)
    .then((data) => {
      idUser = data.user.uid;
      return data.user.getIdToken();
    })
    .then(async (idToken) => {
      token = idToken;
      userCredentials.idUser = idUser;
      userCredentials.imgUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`;
      userCredentials.createdAt = new Date().toISOString();
      delete userCredentials.password;
      return switchStatus(await this.create(User, userCredentials));
    })
    .then((result) => {
      response = {
        status: result.status,
        message: result.message,
        id: result.id,
        token: token,
      };
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/weak-password") {
        response = {
          status: 400,
          message: "Password should be at least 6 characters",
        };
      } else {
        response = {
          status: 500,
          message: err.code,
        };
      }
    });
  return response;
};
// Login
exports.login = async (userCredentials) => {
  let response = {};
  const { fbApp } = require("../../utils/fbApp");

  await fbApp
    .auth()
    .signInWithEmailAndPassword(userCredentials.email, userCredentials.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      response = {
        status: 200,
        message: token,
      };
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        response = {
          status: 403,
          message: "Wrong credentials, please try again",
        };
      } else if (err.code === "auth/too-many-requests") {
        response = {
          status: 403,
          message: "Too many unsuccessful login attempts. Please try again later",
        };
      } else {
        response = {
          status: 500,
          message: err.code,
        };
      }
    });
  return response;
};
// Delete User
exports.deleteUserId = async (id) => {
  const { admin, db } = require("../../utils/admin");
  let response = {};
  await db
    .collectionGroup("users")
    .where("id", "==", id)
    .limit(1)
    .get()
    .then(async (user) => {
      if (user.exists) {
        await admin
          .auth()
          .deleteUser(user.idUser)
          .then((response) => {
            console.log(response);
          });
      }
    });

  return response;
};
// Decode Token
exports.decodeToken = async (token) => {
  const { admin, db } = require("../../utils/admin");
  let response = {};

  await admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      let tokenEmail = decodedToken.email;
      return db.collectionGroup("users").where("email", "==", tokenEmail).limit(1).get();
    })
    .then((data) => {
      if (data.docs.length > 0) {
        response = {
          status: 200,
          message: data.docs[0].data(),
        };
      } else {
        response = {
          status: 404,
          message: "user not found",
        };
      }
    })
    .catch((err) => {
      console.error("Error while verifying token", err);
      if (err.code === "auth/id-token-expired") {
        response = {
          status: 401,
          message: "Firebase ID token has expired!",
        };
      } else {
        response = {
          status: 403,
          message: err,
        };
      }
    });
  return response;
};
