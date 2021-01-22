const express=require("express");//import express
const router=express.Router();

router.get('/',function(request,response){
  response.render('login');
}) ;

router.get('/register',function(request,response){
  response.render('register');
});
router.get('/login',function(request,response){
  response.render('login');
});
router.get('/dashboard',function(request,response){
  response.render('dashboard');
});




module.exports = router;
