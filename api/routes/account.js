const express = require("express")
const router = express.Router()
const app = require("../firebase")

const {getFirestore, getDocs, getDoc, collection, setDoc, doc} = require("firebase/firestore");
const { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, fetchSignInMethodsForEmail } = require("firebase/auth");

const db = getFirestore(app);
const auth = getAuth(app); 


router.post('/create', async (req, res, next) => {
  console.log(req.body); 
  await fetchSignInMethodsForEmail(auth, req.body.email).then((response) => {
    console.log("methods are: ")
    console.log(response)
    if(response[0]) {
        console.log("user exists")
        res.send("An Account with This Computing ID Already Exists!")
    }
    else {
        console.log("user doesnt exist")
        createUserWithEmailAndPassword(auth, req.body.email, req.body.password).then((f) => {
            try {
                console.log("account created"); 
                if(!f) {
                    throw ("new exception"); 
                }
                const docRef = doc(collection(db, "users")); 
                setDoc(docRef, {
                    computingId: req.body.email.split("@")[0], 
                    productsSelling: [],
                    username: req.body.username,
                    cart: []
                }).then(res.send("Account Created! You may now log in."))
            }
            catch(e) {
                console.log(error.message)
            }
        })
    }
    })
})

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
        
    }catch(error){res.send({error: error.message})}
})

module.exports = router; 