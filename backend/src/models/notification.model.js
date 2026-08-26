const mongoose=require("mongoose");
const { applyTimestamps } = require("./lawyer.model");
const notificationSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    tittle:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    type:{
        type:String,
        enum:["success","warning","error","info"],
        default:"infor"
    },
    isRead:{
type:Boolean,
default:false
    }
},{timestamps:true});
module.exports=mongoose.model("Notification",notificationSchema);