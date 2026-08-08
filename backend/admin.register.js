require("dotenv").config();
const mongoose=require("mongoose");
const bcrypt= require("bcrypt");
const Admin=require("./src/models/admin.model");
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("database connected"))
.catch((err)=>console.log(err))
async function createAdmin(){
    const hash= await bcrypt.hash("admin@123",10);
    await Admin.create({
        fullName:"System admin",
        email:"admin@gmail.com",
        password:hash,
    })
    console.log("admin cretaed");
    process.exit();
}
createAdmin();
