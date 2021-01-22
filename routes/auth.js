const express=require("express");//import express
const authController=require('../controllers/auth');

const router=express.Router();
router.post('/register', authController.register) ;
router.post('/login', authController.login);
router.post('/dashboard', authController.login);


module.exports = router;
