import { config } from "dotenv";
import admin from "firebase-admin";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const serviceAccount = require("./firebaseServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default admin;
