const mongoose= require("mongoose");
const adminModel= new mongoose.Schema({
    fullName:String,
    email:{
        type:String,
        require:true
    },password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        default:"admin"
    }
});
module.exports=mongoose.model("Admin",adminModel);