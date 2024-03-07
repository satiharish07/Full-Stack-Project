const { log } = require("console");
const express = require("express");

const path = require("path")
const app = express();
const hbs = require("hbs");

const port = process.env.PORT || 3000;
require("./db/conn")
const Register = require("./models/registers");

const static_path = path.join(__dirname, "../public/css");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res)=>{
    res.render("index");
});

app.get("/register", (req, res)=>{
    res.render("register");
})

app.get("/login", (req, res)=>{
    res.render("login");
})

app.post("/register", async(req, res)=>{
    try{
        const pass = req.body.password;
        const cpassword = req.body.confirmpassword;

        console.log(pass);
        console.log(cpassword);
        console.log(req.body);

        if(pass === cpassword){
            const registerEmployee = new Register({
                firstname : req.body.firstname, // Corrected field name
                lastname : req.body.lastname,
                email : req.body.email,
                phone : req.body.phone,
                password : req.body.password,
                confirmpassword : req.body.confirmpassword,
                gender: req.body.gender
            })

            const registered = await registerEmployee.save();
            res.status(201).render("login");
        }else{
            res.send("Passwords are not matching");
        }
    }catch(error){
        res.status(400).send(error);
    }
})

app.post("/login", async(req, res)=>{
    try{
        const email = req.body.email;
        const pass = req.body.password;

        const useremail = await Register.findOne({email: email});
       
        if(useremail.password === pass){
            res.status(201).render("index");
        }else{
            res.send("Wrong Password");
        }
        
    }catch(error){
        res.status(400).send("invalid Email");
    }
})

app.listen(port, ()=>{
    console.log(`server is running at port number ${port}`);
})