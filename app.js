//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { json } = require("body-parser");
const _ = require('lodash');

let posts = [];

const homeStartingContent = "I'm not good at future planning. I don't plan at all. I don't know what I'm doing tomorrow. I don't have a day planner and I don't have a diary. I completely live in the now, not in the past, not in the future. Jot down your deepest feeling,";
const aboutContent = "Hey there! Thanks for joining in here. I'm Shahryar Rza, a developer. I developed this platform for you. Just feel free to write down your emotions without any hesitations.";
const contactContent = "Contact me anytime. My e-mail: rzashahryar896@gmail.com";

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res)=> {
  res.render("home", {
    someText: homeStartingContent,
    posts: posts,
  });

})




app.get('/about', (req,res)=>{
  res.render("about", {
    aboutUs: aboutContent
  })
})

app.get('/contact', (req,res)=>{
  res.render("contact", {
    contact: contactContent
  })
})

app.get("/compose", (req, res)=>{
  res.render("compose")
})



app.post("/compose", (req, res)=>{
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);
  
  res.redirect("/");

});

app.post("/", (req, res)=>{
  res.redirect("/compose")
})

app.get('/posts/:topics', (req, res)=>{
  const topic = (req.params.topics);
  posts.forEach(function(post){
    if(_.lowerCase(topic) === _.lowerCase(post.title)){
      res.render("post", {
        title: post.title,
        content: post.content
      })
    }
  })
})









app.listen(PORT, function() {
  console.log("Server started on port 3000");
});
