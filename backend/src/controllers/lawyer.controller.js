const lawyermodel =
require('../models/lawyer.model');

const bcrypt =
require('bcrypt');

const jwt =
require('jsonwebtoken');

const imagekit =
require('../config/imagekit');

const lawyerregister =
async function(req,res){

  try{

    const {

      userName,
      fullName,
      password,
      email,
      role,
      phoneNumber,
      specialization,
      experience,
      barCouncilId,
      consultationFee,
      officeAddress

    } = req.body || {};


    // VALIDATION FIRST

    if(

      !userName ||
      !fullName ||
      !password ||
      !email ||
      !role ||
      !phoneNumber ||
      !specialization ||
      !experience ||
      !barCouncilId ||
      !consultationFee ||
      !officeAddress ||

      !req.files ||
      !req.files.profilePicture ||
      !req.files.governmentIdProof ||
      !req.files.lawcertification

    ){

      return res.status(400).json({

        success:false,

        message:"All fields are required"

      });

    }

    // FILES

    const profilePictureFile =
    req.files.profilePicture[0];

    const governmentIdProofFile =
    req.files.governmentIdProof[0];

    const lawcertificationFile =
    req.files.lawcertification[0];

    // CHECK EXISTING LAWYER

    const islawyeralreadyexist =
    await lawyermodel.findOne({

      $or:[

        {
          userName:userName
        },

        {
          email:email
        },

        {
          barCouncilId:barCouncilId
        }

      ]

    });

    if(islawyeralreadyexist){

      return res.status(400).json({

        success:false,

        message:
        "Lawyer already exists"

      });

    }

    // IMAGEKIT UPLOADS

    const profileUpload =
    await imagekit.upload({

      file:
      profilePictureFile.buffer,

      fileName:
      profilePictureFile.originalname

    });

    const governmentIdProofUpload =
    await imagekit.upload({

      file:
      governmentIdProofFile.buffer,

      fileName:
      governmentIdProofFile.originalname

    });

    const lawcertificationUpload =
    await imagekit.upload({

      file:
      lawcertificationFile.buffer,

      fileName:
      lawcertificationFile.originalname

    });

    // HASH PASSWORD

    const hash =
    await bcrypt.hash(password,10);

    // CREATE LAWYER

    const lawyer =
    await lawyermodel.create({

      userName,

      fullName,

      password:hash,

      email,

      role,

      phoneNumber,

      specialization,

      experience,

      barCouncilId,

      consultationFee,

      officeAddress,

      governmentIdProof:
      governmentIdProofUpload.url,

      profilePicture:
      profileUpload.url,

      lawcertification:
      lawcertificationUpload.url

    });

    // TOKEN

    const token =
    jwt.sign(

      {
        id:lawyer._id
      },

      process.env.JWT_SECRETKEY
    );

    res.status(201).json({

      success:true,

      message:
      "Lawyer registered successfully. Waiting for admin approval",

      lawyer,

      token

    });

  }

  catch(error){

    console.log(error);

    res.status(500).json({

      success:false,

      message:error.message

    });

  }
};
// update lawyers profile
 const lawyerUpdate= async (req,res)=>{
   try{const lawyer= await lawyermodel.findByIdAndUpdate(
    req.params.id,req.body ,{new:true}
   )
    res.status(200).json({
      message:"Profile Updated",
      success:true,
      lawyer
    })
  } catch(error){
    res.status(500).json({
      message:error.message,
      success:false
    })
  }
 }
 //fetchng all verified lawyers to view 
 const verifiedlawyers= async (req,res)=>{
  try{
    const lawyer= await lawyermodel.find({
    verificationStatus:"verified"
  });
  res.status(200).json({
    message:"verified lawyersfetched succesfully",
    success:true,
    lawyer
  })
  }catch(error){
    res.status(500).json({
      message:error.message,
      success:false
    })
  }
 }
 const lawyerById=async(req,res)=>{
  try{
    const lawyer=await lawyermodel.findById(req.params.id);
    res.status(200).json({
      message:"lawyer details fetched successfully",
      success:true,
      lawyer
    })
  }catch(error){
    res.status(500).json({
      message:error.message,
      success:false
    })
  }
 }

module.exports = {
  lawyerregister,lawyerUpdate,verifiedlawyers,lawyerById
};