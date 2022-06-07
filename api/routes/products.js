const express = require("express")
const router = express.Router()
const app = require("../firebase")

const {getDocs, getDoc, collection, doc, getFirestore} = require("firebase/firestore")

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

module.exports = router;
