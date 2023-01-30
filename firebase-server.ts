const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccount.json");
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (err) {
  // console.log(err);
}
const db = admin.firestore();
export { admin, db };
