  const mongoose = require('mongoose');
   const clientSchema = new mongoose.Schema({
    fullName:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    
    password:{
        type:String,
        required:true
    },
   phoneNumber:{
    type:String,
    required:true,
   },
   dob:{
    type:Date,
   },
   governmentIdType:{
    type:String
   },
   governmentIdNumber:{
    type:String
   },
   emergencyContactNumber:{
    type:String
   },
   address:{
    type:String
   },role:{
    type:String,
    default:"client"
   }
},{
    timestamps:true
});
     const clientmodel= mongoose.model("Client",clientSchema);
     module.exports = clientmodel;