//MVC are the components of a webpage that makes an efficient request response relation between the webpage and the 
//server M-Model(Database)
// V-views(ejs),
// C-controller(sends and recieve the request)

const { log } = require('console');
const express= require('express');
const port=8000;
const path=require('path');
const db= require('./config/mongoose');
const Contact=require('./models/contact'); 
const app=express();
app.use(express.static("asset"));

// //middleware 1
// app.use(function(req,res,next){
//     req.myName="Om";
//   console.log("middleware 1 called");
//   next();
// });
// //middleware 2
// app.use(function(req,res,next){
//     console.log("middleware 2 called and name is ",req.myName);
//     next();
//   });

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());

var contactList= [
    {
        "name": "Om Sharma",
        "phone": "009928802",

    },
    {
        "name": "Om Sharma",
        "phone": "009928802",

    },
    {
        "name": "Om Sharma",
        "phone": "009928802",

    }
];


app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
            console.log("err fetching contacts");
            return;
        }
        return res.render('home', 
        {title : " Contact App",
         contact_list: contacts})});


    })
  
   //here we are givving a avalue to the const title and we will 
                                                        // render this in the views in other words we are actually
                                                        //sending data to our views through our controller
app.get('/practice',function(req,res){
    return res.render('practice', {title : "Hello World"});

})
app.get('/delete-contact/' ,function(req,res){
    console.log(req.query);
    //get the id of which you want to delete
    let id=req.query.id;
    //find id and delete it
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("coudn't delete ");
            return;
        }
        return res.redirect('back');
    })
       

    

})
app.post('/create-contact',function(req,res){
    // return res.redirect('/practice');
   
    // contactList.push(req.body);
    Contact.create({
        name:req.body.name,
        phone: req.body.phone,
    },function(newContact){
        console.log("*******",newContact);
        return res.redirect("/");
    })
 

})


app.listen(port,function(err){
    if(err){
        console.log('error',port);
        

    }
    console.log("server is running");

});