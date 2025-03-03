// Post question to AI

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const getAnswer = require('./../utils/ai')

router.post("/question", async(req,res)=>{
    console.log("HEy")
    const {question} = req.body;
    console.log(question);
    const answer = await getAnswer(question);
    console.log(answer);
  res.status(200).json({status:'success',data:{
    answer:answer
  }})
});

module.exports = router;