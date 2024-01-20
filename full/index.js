const { authenticate, use } = require('passport');

const express               =  require('express'),
      app                   =  express(),
      mongoose              =  require("mongoose"),
      passport              =  require("passport"),
      bodyParser            =  require("body-parser"),
      LocalStrategy         =  require("passport-local"),
      passportLocalMongoose =  require("passport-local-mongoose"),
      User                  =  require("./models/user"),
      Demande               = require("./models/demande"),
      nodemailer              = require('nodemailer');
var   des;

//Connecting database
mongoose.connect("mongodb+srv://hasnae:eidia2019@cluster0.oyrevzp.mongodb.net/?retryWrites=true&w=majority");
app.use(express.static("public/img"))
app.use(express.static("public/css"))
app.use(require("express-session")({
    secret:"Any normal Word",       //decode or encode session
    resave: false,          
    saveUninitialized:false    
}));

passport.serializeUser(User.serializeUser());       //session encoding
passport.deserializeUser(User.deserializeUser());   //session decoding
passport.use(new LocalStrategy(User.authenticate()));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded(
      { extended:true }
))
app.use(passport.initialize());
app.use(passport.session());

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: 'exemple@gmail.com',
      pass: 'something'
    },
    tls: {
        rejectUnauthorized: false
    }
    
  });
  


//=======================
//      R O U T E S
//=======================

app.get("/", (req,res) =>{
    res.render("home");
})
app.get("/about", (req,res) =>{
    res.render("about");
})

app.get("/userprofile",isLoggedIn ,(req,res) =>{
    res.render("userprofile");
})
//Auth Routes
app.get("/login",(req,res)=>{
    res.render("login");
});

app.get("/error",(req,res)=>{
    res.render("error");
});

app.post("/login",passport.authenticate("local",{
    failureRedirect:"/error"
}),function (req, res){
    const {username,password} =req.body;
    if(username=="admin" && password=="123456"){
        res.redirect("/listDemande")
    }
    else{
        res.redirect("/userprofile")
    }
});

app.get("/register",(req,res)=>{
    res.render("register");
});
app.get("/demandeTerrain",isLoggedIn,(req,res)=>{
    var dates = {};
    Demande.find({status:'Validée'}, (err, items)=> {
        for (let index = 0; index < items.length; index++) {
            if(items[index]?.terrain !== undefined){
                dates[items[index]?.date]  = items[index]?.date;
                console.log('hi ',items[index]?.date)
            }
        }
        res.render("demandeTerrain.ejs", { dates: dates });
    })
});
app.get("/demandeBiblio",isLoggedIn,(req,res)=>{
    var dates = {};
    Demande.find({status:'Validée'}, (err, items)=> {
        for (let index = 0; index < items.length; index++) {
            if(items[index]?.place !== undefined){
                dates[items[index]?.date]  = items[index]?.date;
                console.log('hi ',items[index]?.date)
            }
        }
        res.render("demandeBiblio.ejs", { dates: dates });
    })
});
app.get("/demandeSalle",isLoggedIn,(req,res)=>{
    var dates = {};
    Demande.find({status:'Validée'}, (err, items)=> {
        for (let index = 0; index < items.length; index++) {
            if(items[index]?.salle !== undefined){
                dates[items[index]?.date]  = items[index]?.date;
                console.log('hi ',items[index]?.date)
            }
        }
        res.render("demandeSalle.ejs", { dates: dates });
    })
});
app.get("/demandeMusic",isLoggedIn,(req,res)=>{
    var dates = {};
    Demande.find({status:'Validée'}, (err, items)=> {
        for (let index = 0; index < items.length; index++) {
            if(items[index]?.music !== undefined){
                dates[items[index]?.date]  = items[index]?.date;
                console.log('hi ',items[index]?.date)
            }
        }
        res.render("demandeMusic.ejs", { dates: dates });
    })
});
app.get("/demandePc",isLoggedIn,(req,res)=>{
    var dates = {};
    Demande.find({status:'Validée'}, (err, items)=> {
        for (let index = 0; index < items.length; index++) {
            if(items[index]?.pc !== undefined){
            dates[items[index]?.date]  = items[index]?.date;
            console.log('hi ',items[index]?.date)}
        }
        res.render("demandePc.ejs", { dates: dates });
    })
});
app.get("/myDemandes",isLoggedIn,(req,res)=>{
    Demande.find({matricul:req.user.matricul}, (err, items)=> {
    res.render("myDemandes", { Demande: items, user:req.user });
    console.log('hi',req.user.matricul)
    })
});
app.get("/listDemande",isLoggedIn,(req,res)=>{
    Demande.find({}, (err, items)=> {
        res.render("listDemande.ejs", { Demande: items });
    })
});
app.get("/valide",isLoggedIn,(req,res)=>{
    Demande.find({}, (err, items)=> {
        res.render("valide.ejs", { Demande: items });
    })
});
app.get("/reject",isLoggedIn,(req,res)=>{
    Demande.find({}, (err, items)=> {
        res.render("reject.ejs", { Demande: items });
    })
});
app.get("/users",isLoggedIn,(req,res)=>{
    User.find({}, (err, items)=> {
        res.render("users.ejs", { User: items });
    })
});
app.get("/valide/:id",isLoggedIn,(req,res)=>{
    let id = req.params.id;
    let mtr;
    Demande.findByIdAndUpdate(id,{status:"Validée"},{new:true},(err,demande)=>{
    if(demande){
        mtr = demande.matricul;
        console.log('matricul',mtr)
        User.findOne({matricul:mtr},(error,dest)=>{
            if(dest){
                console.log("email",dest.email)
                var mailOptions = {
                    from: 'hamdaouiwafae2000@gmail.com',
                    to: dest.email,
                    subject: 'Confirmation message',
                    text: 'Votre réservation est validée !'
                  };
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
            }else{
                res.send(error)
            }
            })
        res.redirect("/valide")
    }else {
        res.send(err.message)
    }
    })
});
app.get("/valideTous",isLoggedIn,(req,res)=>{
    Demande.updateMany({},{status:"Validée"},{new:true},(err,demande)=>{
    if(demande){
        res.redirect("/valide")
        
    }else {
        res.send(err.message)
    }
    });
});
app.get("/reject/:id",isLoggedIn,(req,res,next)=>{
    let id = req.params.id; 
    Demande.findByIdAndUpdate(id,{status:"Rejetée"},{new:true},(err,demande)=>{
    if(demande){
        res.redirect("/reject")
    
    }else {
        res.send(err.message)
    }
    })
});
app.get("/deleteR/:id",isLoggedIn,(req,res,next)=>{
    let id = req.params.id; 
    Demande.findByIdAndDelete({_id:id},{new:true},(err,demande)=>{
    if(demande){
        res.redirect("/reject")
    
    }else {
        res.send(err.message)
    }
    })
});

app.get("/annuler/:id",isLoggedIn,(req,res,next)=>{
    let id = req.params.id; 
    Demande.findByIdAndDelete({_id:id},{new:true},(err,demande)=>{
    if(demande){
        res.redirect("/myDemandes")
    }
    })
});

app.get("/deleteV/:id",isLoggedIn,(req,res)=>{
    let id = req.params.id; 
    Demande.findByIdAndDelete({_id:id},{new:true},(err,demande)=>{
    if(demande){
        res.redirect("/valide")
    
    }else {
        res.send(err.message)
    }
    })
});

app.get("/deleteU/:id",isLoggedIn,(req,res)=>{
    let id = req.params.id; 
    User.findByIdAndDelete({_id:id},{new:true},(err,user)=>{
    if(user){
        res.redirect("/users")
    
    }else {
        res.send(err.message)
    }
    })
});

app.post("/demandeSalle",(req,res)=>{
    const {matricul,nom,prenom,ecole,date,duree,motif,salle,batiment,music,terrain,place,pc} =req.body;
    Demande.findOne({salle:salle,duree:duree,date:date,batiment:batiment,status:"Validée"},(err,demande)=>{
    if(demande){
    res.render("message")
    }else {
    const demande = new Demande({matricul,nom,prenom,ecole,date,duree,motif,salle,batiment,music,terrain,place,pc})
    demande.save(err=>{
    if(err){
    res.send(err.message)
    }else{
        res.redirect("myDemandes");
    }
    })
    }
    })
    });

    app.post("/demandeMusic",(req,res)=>{
        const {matricul,nom,prenom,ecole,date,duree,motif,music,salle,batiment,terrain,place,pc} =req.body;
        Demande.findOne({music:music,duree:duree,date:date,batiment:batiment,status:"Validée"},(err,demande)=>{
        if(demande){
        res.render("message")
        }else {
        const demande = new Demande({matricul,nom,prenom,ecole,date,duree,motif,music,salle,batiment,terrain,place,pc})
        demande.save(err=>{
        if(err){
        res.send(err.message)
        }else{
            res.redirect("myDemandes");
        }
        })
        }
        })
        })

app.post("/valide/:id",(req,res)=>{
        let id = req.params.id; 
        Demande.findByIdAndUpdate(id,{status:"Validée"},{new:true},(err,demande)=>{
        if(demande){
            
            res.redirect("/valide",{ Demande: demande })
            
        }else {
            res.send(err.message)
        }
        })
        })
app.post("/reject/:id",(req,res)=>{

    let id = req.params.id; 
    Demande.findByIdAndUpdate(id,{status:"Rejetée"},{new:true},(err,demande)=>{
    if(demande){
        res.redirect("/reject",{ Demande: demande })
    
    }else {
        res.send(err.message)
    }
    })
})

app.post("/demandeTerrain",(req,res)=>{
    const {matricul,nom,prenom,ecole,date,duree,motif,salle,batiment,music,terrain,place,pc} =req.body;
    Demande.findOne({terrain:terrain,duree:duree,date:date,status:"Validée"},(err,demande)=>{
    if(demande){
    res.send({message:"ressouce already reserved"})
    }else {
    const demande = new Demande({matricul,nom,prenom,ecole,date,duree,motif,terrain,salle,batiment,music,place,pc})
    demande.save(err=>{
    if(err){
    res.send(err.message)
    }else{
        res.redirect("myDemandes");
    }
    })
    }
    })
    })
app.post("/demandeBiblio",(req,res)=>{
    const {matricul,nom,prenom,ecole,date,duree,motif,salle,batiment,music,terrain,place,pc} =req.body;
    Demande.findOne({duree:duree,date:date,place:place,status:"Validée"},(err,demande)=>{
    if(demande){
    res.render("message.ejs")
    }else {
    const demande = new Demande({matricul,nom,prenom,ecole,date,duree,motif,place,salle,batiment,music,terrain,pc})
    demande.save(err=>{
    if(err){
    res.send(err.message)
    }else{
        res.redirect("myDemandes");
    }
    })
    }
    })
    })

app.post("/demandePc",(req,res)=>{
    const {matricul,nom,prenom,ecole,date,duree,motif,salle,batiment,music,terrain,place,pc} =req.body;
    Demande.findOne({duree:duree,date:date,pc:pc,status:"Validée"},(err,demande)=>{
    if(demande){
    res.send({message:"ressouce already reserved"})
    }else {
    const demande = new Demande({matricul,nom,prenom,ecole,date,duree,motif,place,salle,batiment,music,terrain,pc})
    demande.save(err=>{
    if(err){
    res.send(err.message)
    }else{
        res.redirect("myDemandes");
    }
    })
    }
    })
    })

app.post("/register",(req,res)=>{
    
    User.register(new User({username: req.body.username,matricul:req.body.matricul,email:req.body.email,ecole: req.body.ecole}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.render("register");
        }
    passport.authenticate("local")(req,res,function(){
        res.redirect("/login");
    })    
    })
})

app.get("/logout",(req,res)=>{
    res.redirect("/");
});

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


//Listen On Server


app.listen(process.env.PORT ||3000,function (err) {
    if(err){
        console.log(err);
    }else {
        console.log("Server Started At Port 3000");
    }
      
});
