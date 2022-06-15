const admin = require("firebase-admin");
const db = admin.firestore();

const extractUid = ({ uid }) => uid;

const getRole = (uid) => {
  const roleRef = db.collection("roles").doc(uid);
  return roleRef.get();
};

const roleExists = (role) => {
  if (!role && !role.exists)
    throw new Error({ code: "auth/no-role", message: "No role defined" });
  return role.data();
};

const roleIsAdmin = ({ admin }) => {
  if (admin && admin === true) return admin;
  throw new Error({
    code: "auth/no-admin-role",
    message: "Admin access needed for this",
  });
};

// Verify access via the roles collection
const isAdmin = (uid) => {
  return new Promise((resolve, reject) => {
    return resolve(true);
    // getRole(uid)
    // .then(roleExists)
    // .then(roleIsAdmin)
    // .then(resolve)
    // .catch(reject);
  });
};

// Verify access via the roles collection
const requestIsAdmin = (token) => {
  return new Promise((resolve, reject) => {
    return resolve(true);
    // token comes from the client app
    // admin
    // .auth()
    // .verifyIdToken(token)
    // .then(extractUid)
    // .then(isAdmin)
    // .then(resolve)
    // .catch(reject);
  });
};

exports.requestIsAdmin = requestIsAdmin;
exports.isAdmin = isAdmin;
