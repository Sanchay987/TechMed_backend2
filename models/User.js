const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");



const UserSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      profilePic: {
        type: String,
        default: "",
      },
      tokens:[{
        token:{
          type:String,
          required:true
        }
    }]
    },
    { timestamps: true } 
  );


  UserSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id:this._id.toString()},process.env.MY_SECRET);
        this.tokens=this.tokens.concat({token:token})
        await this.save();
        return token;
    } catch (error) {
        res.send(error);
        console.log(error);
    }
}



  
  module.exports = mongoose.model("User", UserSchema);