const mongoose = require('mongoose');
const messageSchema=new mongoose.Schema({
    appointmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Appointment",
        required:true
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    text:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
module.exports=mongoose.model("Message",messageSchema);