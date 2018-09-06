const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');



const app = express();

//app config
mongoose.connect("mongodb://localhost/restfull_blog_app", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));


let port = process.env.port || 3000;
//Mongoose config
let blogSchema=mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{type:Date,default:Date.now()}
});

let Blog=mongoose.model("Blog",blogSchema);
// Blog.create({
//     title:"test blog",
//     image:"https://assets1.bigthink.com/system/idea_thumbnails/45543/size_896/Mondrian%20grid.jpg?1343912136",
//     body:"Your Brain Looks Like a Mondrian Grid Painting"

// })
//RESTFULL ROUTES

app.get(['/','/blogs'], (req, res) => {
    Blog.find({},(err,blogs)=>{
        if(err){
            console.log(err);
        }else{
            res.render('index',{blogs:blogs});
        }
    });
   
});

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})