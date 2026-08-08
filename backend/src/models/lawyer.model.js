 const mongoose=require('mongoose');
  const lawyerSchema= new mongoose.Schema({

    fullName:{
        type:String,
        required:true
    },password:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true,
        unique:true
    },role:{
        type:String,
        required:true
    },phoneNumber:{
        type:String,
        required:true
  },specialization:{
    type:String,
    required:true},
    experience:{
        type:Number,
        required:true},
    barCouncilId:{
            type:String,
            required:true,
            unique:true
        },
    consultationFee:{
            type:Number,
            required:true},
    officeAddress:{
            type:String,
            required:true},
governmentIdProof:{
    type:String,
    required:true
},
profilePicture:{
    type:String,
    required:true},
lawcertification:{
    type:String,
    required:true},
verificationStatus:{
    type:String,
    enum:["pending","verified","rejected"],
    default:"pending"}

},{
    timestamps:true
})
const lawyermodel= mongoose.model("lawyer",lawyerSchema);
  module.exports= lawyermodel;    
