const express = require("express")
const router = express.Router()
const app = require("../firebase")

const {getDocs, getDoc, collection, doc, getFirestore, setDoc, updateDoc} = require("firebase/firestore")

const db = getFirestore(app);


router.get('/info', async (req, res, next) => {
  const allData = []; 
  const docs = await getDocs(collection(db, "products"))
  docs.forEach((doc) => {
    let newVar = doc.data(); 
    newVar.id = doc.id; 
    allData.push(newVar); 
  })
  res.json({result:allData}); 
});

router.get("/info/:id", async (req,res,next) => {
  getDoc(doc(db, "products", req.params.id))
  .then((doc) => {res.send(doc.data())})
})

//use res.data to get id of the doc you just created
router.post("/create", async (req, res, next) => {
  const docRef = doc(collection(db, "products")); 
    setDoc(docRef, {
      bought: false, 
      condition: req.body.condition, 
      datePosted: new Date(), 
      description: req.body.description, 
      name: req.body.name, 
      negotiable: req.body.negotiable, 
      numberAvailable: req.body.numberAvailable, 
      pickupLocation: req.body.pickupLocation, 
      price: req.body.price,
    }).then(res.send(docRef.id))
})

router.put("/toggleBought/:ID", async (req,res,next) => {
  console.log(req.params); 
  const newRef = doc(db, "products", req.params.ID);
  getDoc(newRef)
  .then((doc) =>{
      let curBought = !(doc.data().bought); 
      updateDoc(newRef, {
          bought: curBought,
      }).then(res.send("success"))
  })
})

router.put("/edit", async (req,res,next) => {
  console.log(req.body);
  const newRef = doc(db, "products", req.body.ID);
  updateDoc(newRef, {
    condition: req.body.condition, 
    description: req.body.description, 
    name: req.body.name, 
    negotiable: req.body.negotiable, 
    numberAvailable: req.body.numberAvailable, 
    pickupLocation: req.body.pickupLocation, 
    price: req.body.price,
  }).then(res.send("received"))
})

module.exports = router;
