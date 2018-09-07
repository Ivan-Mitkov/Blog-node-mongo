const express = require('express'),
    methodOverride=require('method-override'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');



const app = express();

//app config
mongoose.connect("mongodb://localhost/restfull_blog_app", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));


let port = process.env.port || 3000;
//Mongoose config
let blogSchema = mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now() }
});

let Blog = mongoose.model("Blog", blogSchema);
// Blog.create({
//     title:"test blog",
//     image:"https://assets1.bigthink.com/system/idea_thumbnails/45543/size_896/Mondrian%20grid.jpg?1343912136",
//     body:"Your Brain Looks Like a Mondrian Grid Painting"

// })
//RESTFULL ROUTES
//index route
app.get(['/', '/blogs'], (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { blogs: blogs });
        }
    });

});
//new route
app.get('/blogs/new', (req, res) => {
    res.render('new');
});
// create route
app.post('/blogs', (req, res) => {
    Blog.create(req.body.blog, (err, newBlog) => {
        if (err) {
            res.render('new');
        } else {
            res.redirect('/blogs');
        }

    })
});

//show route
app.get('/blogs/:id', (req, res) => {

    Blog.findById(req.params.id, (err, showBlog) => {
        if (err) {
            res.redirect('/blogs');
        } else {

            res.render('show', { blog: showBlog });
        }
    })
});

//edit route
app.get('/blogs/:id/edit', (req, res) => {

    Blog.findById(req.params.id, (err, editBlog) => {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.render('edit', { blog: editBlog });
        }
    });
});

//update route
app.put('/blogs/:id',(req,res)=>{
    Blog.findByIdAndUpdate(req.params.id, req.body.blog,(err,updatedBlog)=>{
        if (err) {
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs/'+req.params.id);
        }
    });
});

//delete route
app.delete('/blogs/:id',(req,res)=>{
    
    Blog.findByIdAndRemove(req.params.id,(err,deletedPost)=>{
        if(err){
            res.redirect('/blogs');
        }else{
            res.redirect('/blogs');
        }
    });
});


app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})