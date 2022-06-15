const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const serviceAccount = require("./sprent-ab-firebase-adminsdk-ew4r8-d1f45d4ee9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sprent-ab.firebaseio.com",
});

// utils need firebase.app to be initialized before used.
const { requestIsAdmin, isAdmin } = require("./utils");

const { saveHousingRequest, saveLandlordRequest } = require("./forms");

// Called at /<fn-name>, routed in firebase.json.
// Nice for dev, but hosted in us-central1. Adds ~200-300 ms after coldstart.
// https://firebase.google.com/docs/hosting/full-config#direct_requests_to_a_function
//
// NOTE: You need to route traffic during dev in webpack.config.js and firebase.json
const wrapHttps = (req, resp, callback) => {
  cors(req, resp, () => {
    const { body } = req;
    const { token } = body;

    console.log({ token });

    const error = (err) => {
      const { code, message } = err;
      console.log(code, message, err);

      if (code === "auth/no-role" || code === "auth/no-admin-role") {
        return resp.status(401).send({ status: "Access denied" });
      }

      return resp.status(500).send(err);
    };

    requestIsAdmin(token)
      .then(() => callback(body))
      .then((data) => resp.send(data))
      .catch(error);
  });
};

// Called with functions.httpsCallable(...)
// Harded to test, needs to be deployed before use.
// Can be hosted in europe, lower latency.
const wrapRPC = (data, context, callback) => {
  const denied = (err) => {
    console.log(err);

    return { status: "Access denied" };
  };

  const error = (err) => {
    console.log(err);

    return err;
  };

  // Checking that the user is authenticated.
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated."
    );
  }

  // Authentication / user information is automatically added to the request.
  const uid = context.auth.uid;
  const name = context.auth.token.name || null;
  const email = context.auth.token.email || null;

  // return({ text, uid, name, email });
  return isAdmin(uid)
    .then(() => callback(data))
    .then((data) => data)
    .catch(denied);
};

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Wrap https handler on functions here
exports.saveHousingRequest = functions.https.onRequest((req, resp) =>
  wrapHttps(req, resp, saveHousingRequest)
);
exports.saveLandlordRequest = functions.https.onRequest((req, resp) =>
  wrapHttps(req, resp, saveLandlordRequest)
);

// Wrap rpc handler on functions here
exports.saveHousingRequestRpc = functions
  .region("europe-west1")
  .https.onCall((data, context) => wrapRPC(data, context, saveHousingRequest));
exports.saveLandlordRequestRpc = functions
  .region("europe-west1")
  .https.onCall((data, context) => wrapRPC(data, context, saveLandlordRequest));
