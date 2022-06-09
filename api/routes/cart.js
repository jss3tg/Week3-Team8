const express = require("express")
const router = express.Router()
const app = require("../firebase")

const {getDocs, setDoc, getDoc, collection, doc, getFirestore, updateDoc} = require("firebase/firestore")

const db = getFirestore(app);


/* GET users cart. */
router.get('/:userID', async (req, res, next) => {
        console.log(req.params)
        getDoc(doc(db, "users", req.params.userID))
        .then((doc) => {
            const cartArray = doc.data().cart; 
            let newArray = []; 
            for(let x = 0; x < cartArray.length; x++) {
                let alreadyInArray = false; 
                for(let y = 0; y < newArray.length; y++) {
                    if(cartArray[x]._key.path.segments[6]==newArray[y].id) {
                        alreadyInArray = true;
                        newArray[y].quantity += 1;  
                    }
                }
                if(!alreadyInArray) {
                    const newVar = {
                        id: cartArray[x]._key.path.segments[6], 
                        quantity: 1
                    }
                    newArray.push(newVar); 
                }
                
            }
            console.log(newArray); 
            res.json({result: newArray})
        })
});

router.put("/addToCart/:userID/:productID", async (req, res, next) => {
  console.log(req.params); 
  const newRef = doc(db, "users", req.params.userID);
  const path = doc(db, "products/" + req.params.productID); 
  getDoc(newRef).then((doc) => {
      let newArray = [];
      for(let x = 0; x < doc.data().cart.length; x++) {
        newArray.push(doc.data().cart[x]);
      }
      newArray.push(path); 
      updateDoc(newRef, {
        cart: newArray,
      }).then(res.send("success"))
  })
})

router.put("/clearCart/:userID", async (req, res, next) => {
    console.log(req.params); 
    const newRef = doc(db, "users", req.params.userID);
    updateDoc(newRef, {
        cart: [],
    }).then(res.send("success"))
}) 

module.exports = router;
