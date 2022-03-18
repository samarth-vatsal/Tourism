const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
  extended:true
}));


app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/adventourDB",{ useNewUrlParser: true,useUnifiedTopology: true });


const userSchema ={
  fname: String,
  lname:String ,
  email:String ,
  password: String
};

const User = new mongoose.model("User",userSchema);

/*const fruit = new Fruit({
  name:"pila aam",
  rating: 10,
  review: "preety solid as a fruit"
});

fruit.save();


const mango = new Fruit({
  name: "hra aam",
  rating: 9,
  review: "Great fruit"
});
mango.save();
*/

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
});

app.get("/login",function(req,res){
res.sendFile(__dirname+"/public/login/login.html");
});

app.get('/bidar',function(req,res){
  res.render('bidar');
});
app.get('/book',function(req,res){
  res.render('book');
});


app.get('/hotel',function(req,res){
  res.render('hotel');
});

app.post("/register",function(req,res){
const newUser =new User({
  fname:req.body.fname,
  lname:req.body.lname,
  email:req.body.username,
  password:req.body.password
});
newUser.save(function(err){
  if (err) {
    console.log(err);
  }

  res.redirect("/");
});
});

app.post("/login",function(req,res){
const username= req.body.username;
const password=req.body.password;

User.findOne({email:username},function(err,foundUser) {
  if(err)
  {
    console.log(err);
  }
  else{
    if (foundUser) {
      if (foundUser.password===password) {

        res.redirect("/");
      }

    }
  }
})


});






app.listen(3000,function(){
  console.log("server is running on port 3000");
})
