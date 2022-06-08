const express = require("express")
const router = express.Router()
const app = require("../firebase")

const {getDocs, getDoc, collection, doc, getFirestore, updateDoc} = require("firebase/firestore")

const db = getFirestore(app);


/* GET users listing. */
router.get('/info', async (req, res, next) => {
  const allData = []; 
  const docs = await getDocs(collection(db, "users"))
  docs.forEach((doc) => {
    let newVar = doc.data(); 
    newVar.id = doc.id; 
    allData.push(newVar); 
  })
  res.json({result:allData}); 
});

router.get("/info/:id", async (req,res,next) => {
  console.log(req.params)
  getDoc(doc(db, "users", req.params.id))
  .then((doc) => {res.send(doc.data())})
})

router.put("/addProduct/:userID/:productID", async (req, res, next) => {
  console.log(req.params); 
  const newRef = doc(db, "users", req.params.userID);
  getDoc(newRef)
    .then((result) =>{
        let curProducts = result.data().productsSelling; 
        if(!curProducts) {
          curProducts = [];
        }
        let productPath = doc(db, "products/" + req.params.productID); 
        curProducts.push(productPath)
        updateDoc(newRef, {
            productsSelling: curProducts
        }).then(res.send("success"))
    })
})

//untested
router.put("/removeProduct/:userID/:productID", async (req, res, next) => {
  console.log(req.params); 
  const newRef = doc(db, "users", req.params.userID);
  getDoc(newRef)
    .then((doc) =>{
        let curProducts = doc.data().productsSelling; 
        if(!curProducts) {
          curProducts = [];
        }
        let newArray = []; 
        for(let x = 0; x < curProducts.length; x++) {
          if(curProducts[x]._key.path.segments[6] != req.params.productID) {
            newArray.push(curProducts[x])
          }
        }
        updateDoc(newRef, {
            productsSelling: newArray
        }).then(res.send("success"))
    })
})

module.exports = router;
