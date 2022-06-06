const express = require("express")
const router = express.Router()
const db = require("./firebase")

const {getDocs, getDoc, collection} = require("firebase/firestore")


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
  getDoc(doc(db, "users", req.params.id))
  .then((doc) => {res.send(doc.data())})
})

module.exports = router;
