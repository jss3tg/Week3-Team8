const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getAuth } = require("firebase/auth");
 
// const serviceAccount = require("./permissions.json");
const serviceAccount = {
    apiKey: "AIzaSyBOz0wwFKWRtnA4S6b3xI4KacOmmp_wVfE",
    authDomain: "hoos-selling.firebaseapp.com",
    projectId: "hoos-selling",
    storageBucket: "hoos-selling.appspot.com",
    messagingSenderId: "251974972926",
    appId: "1:251974972926:web:bbe3652e271875a69dfcaf"
  };
 
const app = initializeApp(serviceAccount);
const db = getFirestore(app);
const auth=getAuth(app); 
 
module.exports = app;