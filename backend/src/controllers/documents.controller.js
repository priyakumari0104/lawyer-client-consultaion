const Document=require("../models/document.model");
const imageKit=require("../config/imagekit");
// upload documents
const uploadDocument=async(req,res)=>{
    try{
    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);
        const {
            clientId,
            lawyerId,
            caseId,
            appointmentId,
            documentType
        }= req.body;
         if(!req.file){
            return res.status(400).json({
                message:"please upload a document",
                success:false
            })
         }
         // valdation require ids
if(!lawyerId||!clientId||!caseId){
    return res.status(400).json({
        message:"clientid,lawyerid and caseid are required",
        success:false
    });
}
//upload files to image kit
const uploadedFile= await imageKit.upload({
    file:req.file.buffer,
    fileName:`${Date.now()}-${req.file.originalname}`,
    useUniqueFileName:true
})
// save file in db
const documents=await Document.create({
    clientId,
    lawyerId,
    caseId,
    appointmentId:appointmentId||null,
    uploadedBy:clientId,
    fileName:req.file.originalname,
    fileUrl:uploadedFile.url,
    fileType:req.file.mimetype,
    fileSize:req.file.size,
    documentType:documentType|| "other",
})
return res.status(200).json({
    message:"Document uploded successfully",
    success:true,
    documents
})
         
    }catch(error){
        console.log("document uplaod error",error);
        console.log(error);
res.status(500).json({
    message:error.message,
    success:false
})
    }
}
const getClientDocuments=async(req,res)=>{
    try{
const documents=await Document.find({
    clientId:req.params.clientId,
    isDeleted:false,
}).sort({createdAt:-1});
res.status(200).json({
    success:true,
    message:"client documents are fetched successfully",
    documents
})
    }catch(error){
res.status(500).json({
    success:false,
    message:error.message,
})
    }
}
// get documents attached to aparticular appointments
 const getAppointmentsDocuments= async(req,res)=>{
    try{
const documents= await Document.find({
    appointmentId:req.params.appointmentId,
    isDeleted:false
}).sort({createdAt:-1})
res.status(200).json({
    message:"Appointments documents fetched successfully",
    success:true,
    documents
})
    }catch(error){
res.status(500).json({
    message:error.message,
    success:false
})
    }
 }
 //get all documnets belonging to a particular case
 const getCaseDocuments= async(req,res)=>{
    try{
const documents= await Document.find({
    caseId:req.params.caseId,
    isDeleted:false,
}).sort({createdAt:-1})
res.status(200).json({
    message:"Case documents fetched successfully",
    success:true,
    documents
})
    }catch(error){
res.status(500).json({
    message:error.message,
    success:false
})
    }
 }
 // delete documents
  const deleteDocuments=async(req,res)=>{
    try{
const document=await Document.findByIdAndUpdate(
    req.params.id,
    {isDeleted:true},
    {new:true}
);
if(!document){
    return res.status(404).json({
        success:false,
        message:"Document not found"
    })
}
res.status(200).json({
    message:"Document deleted successfully",
    success:true
});
    }catch(error){
res.status(500).json({
    success:false,
    message:error.message,
}
   ) }
  }
  module.exports={deleteDocuments,
    getAppointmentsDocuments,
    getCaseDocuments,
    getClientDocuments,uploadDocument};