const express = require("express")
const router = express.Router()
const app = require("../firebase")

const {getFirestore, getDocs, getDoc, collection, setDoc, doc} = require("firebase/firestore");
const { createUserWithEmailAndPassword, getAuth } = require("firebase/auth");

const db = getFirestore(app);
const auth = getAuth(app); 


router.post('/create', async (req, res, next) => {
  console.log(req.body); 
    try{
        await createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
        console.log("account created"); 
        const docRef = doc(collection(db, "users")); 
        setDoc(docRef, {
            computingId: req.body.email.split("@")[0], 
            productsSelling: [],
            username: req.body.username,
        })
    }catch(error){console.log(error.message)}
});

module.exports = router; 