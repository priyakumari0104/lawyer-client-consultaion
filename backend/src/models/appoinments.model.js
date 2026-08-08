const mongoose= require("mongoose");
const appoinmentSchema= new mongoose.Schema({
    clientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"clients",
        required:true
    },
    lawyerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"lawyers",
        required:true
    },
    appoinmentDate:{
        type:String
        
    },
    appoinmentTime:{
        type:String
        
    },
    issueType:String,
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"]
    },

},{timeStamps:true});

 const appoinmentsModel=mongoose.model("appoinments",appoinmentSchema);
 module.exports=appoinmentsModel;