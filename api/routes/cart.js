const express = require("express")
const router = express.Router()
const app = require("../firebase")

const {getDocs, getDoc, collection, doc, getFirestore, updateDoc} = require("firebase/firestore")

const db = getFirestore(app);


/* GET users listing. */
router.get('/:userID', async (req, res, next) => {
  const allData = []; 
  const docs = await getDocs(collection(db, "users", req.params.userID, "cart"))
  docs.forEach((doc) => {
    let newVar = doc.data(); 
    newVar.id = doc.id; 
    allData.push(newVar); 
  })
  res.json({result:allData}); 
});

module.exports = router;
