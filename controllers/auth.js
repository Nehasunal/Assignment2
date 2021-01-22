
const mysql= require("mysql");




const db=mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database:process.env.DATABASE
});

exports.login=async (request,response)=>{
  try {
     const{email, password}=request.body;

    if(email && password)
    {
     db.query('SELECT * from users WHERE email = ? AND password=?',[email, password], async(error,results)=>{

      if (results.length > 0) {
    console.log(results[0].name+ " " +results[0].email);
   // var data=(results[0].name+ " " +results[0].email);
  //  response.redirect('/dashboard',)
  return response.status(200).render('dashboard',{
      name: results[0].name, email: results[0].email, Phone_no: results[0].Phone_no, Dob: results[0].Dob, Address: results[0].Address  //get details

    })
    //  res.render('dashboard.hbs',{data:results, message: message});
       }
       else{
         return response.status(400).render('login',{
             message:'Incorrect email or password'
           })
         //response.send("error");
       }

    })
  }
  else{
    return response.status(400).render('login',{
         //render login page and give message
        message:'Please provide an email and password'


      })
  }


  } catch (error) {
    console.log(error)
  }
}

exports.register=(request, response)=>{

  console.log(request.body);

const{name, email, password, confirmpassword, Dob, Phone_no, Address}=request.body;

db.query('SELECT email FROM users WHERE email= ?', [email], async (error, results)=>{
  if(error){
    console.log(error);
  }
  if(results.length > 0){
    return response.render('register',{
      message:'That email is already in use'
    })
  }
  else if(password!==confirmpassword){
    return response.render('register',{
      message:'Passwords do not match'
    });
  }
});


db.query('INSERT INTO users SET ?',{name: name, email: email, password: password, Dob: Dob, Phone_no: Phone_no, Address: Address  }, (error, results)=>{
  if(error) {
    console.log(error);
  }
  else {

    return response.render('register',{
      message:'User registered'

    });
}
})

}
