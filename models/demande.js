const mongoose = require("mongoose");
const DemandeSchema = new mongoose.Schema({
    matricul:{type:String,unique:false,undefined:false},
    nom:{type:String,unique:false,undefined:false},
    prenom:{type:String,unique:false,undefined:false},
    salle:{type:String,unique:false,undefined:false},
    music:{type:String,unique:false,undefined:false},
    batiment:{type:String,unique:false,undefined:false},
    terrain:{type:String,unique:false,undefined:false},
    place:{type:String,unique:false,undefined:false},
    pc:{type:String,unique:false,undefined:false},
    date:{type:Date,unique:false,undefined:false},
    duree:{type:String,unique:false,undefined:false},
    motif:{type:String,unique:false,undefined:false},
    status:{type:String,default:"En Attente",unique:false,undefined:false},
}) ;
module.exports = mongoose.model("Demande",DemandeSchema);