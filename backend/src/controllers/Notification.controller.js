const Notification=require("../models/notification.model");
// get allnotification
const getAllNotifications= async(req,res)=>{
    try{

        const{userId}=req.params;
        const notification= await  Notification.find({
            userId,
        }).sort({createdAt:-1});
        res.status(200).json({
            message:"all notifications are fetched",
            success:true,
             notification
        })
    }catch(error){
res.status(500).json({
    message:error.message,
    success:false
})
    }
}
//mark a notification as read
 const markAsRead= async(req,res)=>{
    try{
const{id}=req.params;
const notification=await Notification.findByIdAndUpdate(
    id,{
        isRead:true
    },{
        new:true
    }
);
if(!notification){
    return res.status(400).json({
        message:"notification not found",
        success:false
    })
}
res.status(200).json({
    message:"Notification marked as read",
    success:true,
    notification
})
}catch(error){
res.status(500).json({
    message:error.message,
    success:false
})
    }
 };
//delete a notification
 const deleteNotification=async(req,res)=>{
    try{
const{id}=req.params;
const notification=await Notification.findByIdAndDelete(id);
if(!notification){
    return res.status(400).json({
        message:"nonotification to delete",
        succcess:false
    })
}
res.status(200).json({
    message:"notification deleted successfully",
    success:true,
    notification
})
    }catch(error){
res.status(500).json({
    message:error.message,
    success:false
})
    }
 }
 // delete allnotification
 const deleteAllNotification= async(req,res)=>{
    try{
const {userId}=req.params;
const notification=await Notification.deleteMany({
    userId,
});
res.status(200).json({
    message:"all notifications are deleted",
    success:true
})
    }catch(error){
res.status(500).json({
    message:error.message,
    success:false
})
    }
 }
 module.exports={getAllNotifications,markAsRead,deleteNotification,deleteAllNotification};