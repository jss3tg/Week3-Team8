const express = require("express")
const router = express.Router()
const app = require("../firebase")

const {getDocs, setDoc, getDoc, collection, doc, getFirestore, updateDoc} = require("firebase/firestore")

const db = getFirestore(app);


/* GET users cart. */
//THIS IS UNTESTED
router.get('/:userID', async (req, res, next) => {
        console.log(req.params)
        getDoc(doc(db, "users", req.params.id))
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
                }
                
            }
            console.log(newArray); 
            res.json({result: newArray})
        })
});

router.put("/addToCart/:userID/:productID", async (req, res, next) => {
  console.log(req.params); 
  const newRef = doc(db, "users", req.params.userID, "cart");
  const path = doc(db, "products/" + req.params.productID); 
  setDoc(newRef, {
    item: path, 
    quantity: req.params.quantity
}).then(res.send("success"))
})

router.put("/clearCart/:userID", async (req, res, next) => {
    console.log(req.params); 
    
}) 

module.exports = router;
