const mongoose=require('mongoose');
const appoinmentSchema=  new mongoose.Schema({
clientId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Client",
    required:true
},
lawyerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"lawyer",
    required:true
},
issueType:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
status:{
    type:String,
    enum:["pending","approved","rejected"],
    default:"pending"
}
},{timestamps:true})
module.exports=mongoose.model("Appointment",appoinmentSchema);