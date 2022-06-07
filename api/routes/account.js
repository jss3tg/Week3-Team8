const express = require("express")
const router = express.Router()
const app = require("../firebase")

const {getFirestore, getDocs, getDoc, collection, setDoc, doc} = require("firebase/firestore");
const { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } = require("firebase/auth");

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

router.get("/login/:email/:password", async (req, res, next) => {
    try{
        console.log(req.params)
        await signInWithEmailAndPassword(auth, req.params.email, req.params.password)
        const compID = req.params.email.split("@")[0];
        console.log(compID)
        let userID = "USER NOT FOUND"
        const docs = await getDocs(collection(db, "users"))
        docs.forEach((doc) => {
            console.log(doc.data().computingId)
            if(doc.data().computingId == compID) {
                res.send({id: doc.id, ...doc.data()})
            }
        })
        
    }catch(error){console.log(error.message)}
})

module.exports = router; 