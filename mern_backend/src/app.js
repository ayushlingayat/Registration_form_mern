const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');

require('./db/conn')

const Register = require('./models/registers');
const { log } = require('console');

const port = process.env.PORT || 8080;

const static_path = path.join(__dirname , '../public');
const template_path = path.join(__dirname , '../template/views');
const partials_path = path.join(__dirname , '../template/Partials');

// console.log(__dirname , '../public');
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(express.static(static_path))

app.set("view engine" , "hbs");
app.set("views" ,path.join(__dirname , "../src/Templates/views"));
app.use(express.static(path.join(__dirname , "public")));
hbs.registerPartials(path.join(__dirname , "../src/Templates/Partials"));

app.get("/" ,(req , res)=>{
    res.render("index")
})

app.get("/register" , (req , res)=>{
    res.render('register');
})

//create a new user in our database
app.post("/register" , async (req , res)=>{
    try{
        // res.send(req.body.fname);
        // console.log(req.body.fname);

        const password = req.body.password;
        const cpassword = req.body.conformpassword;


        if(password === cpassword){
            const registerEmployee = new Register({
                firstname: req.body.fname,
                lastname:req.body.lname,
                email:req.body.email,
                password:password,
                conformpassword:cpassword
            })

          const registered = await registerEmployee.save();
          res.status(201).render('index');
        }
        else{
            res.send(`Passwords are not matching...`)
        }
    }
    catch(e){
        res.status(400).send(e);
    }
})
app.get("/login" , (req , res)=>{
    res.render('login');
})


app.listen(port , (req , res)=>{
    console.log(`Listening on port ${port}`)
});