import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      minlength: 6,        
    },

    role: {
      type: String,
      enum: ["admin", "mentor", "intern", "interviewer"],
      required: true,
    },

    phone: {
      type: String,
    },

    slackId: {
      type: String, 
    },

    profileImage: {
      type: String,
    },
    
    profileImagePublicId:{ 
      type: String 
    },

    dob: { 
      type: String
    },
    gender: { 
      type: String,
    },

    bloodGroup:{
      type:String
    },

    currentAddress : {
      type: String
    },

    permanentAddress: { 
      type: String 
    },
    degree: {
      type: String,
    },
    college: {
      type: String
    },

    educationYear:{
      type:String
    },

    primaryskills:[
      {
        type: String,
      },
    ],

    secondaryskills:[
      {
        type:String,
      }
    ],

    empId:{
      type:String,
    },

    empEmail:{
      type: String,
    },

    batch:{
      type: String
    },

    year:{
      type: String
    },

    phase:{
      type: String
    },

    dateofjoining:{
      type:Date,
    },

    designation: {    
      type: String,
    },

    activeStatus: {
      type: Boolean,
      default: true,
    },
    refreshToken:{
      type:String
    },
    googleAuth:{
      type:Boolean,
      default:false,
    }
  },
  {
    timestamps: true, 
  }
);

// Indexes for faster lookups
userSchema.index({ role: 1 });
userSchema.index({ email: 1 });

// Hide password from API responses
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model("User", userSchema);

export default User;