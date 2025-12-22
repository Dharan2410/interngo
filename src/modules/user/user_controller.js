import User from "./user_model.js"
import cloudinary from "../../../config/cloudinary.js";
import streamifier from "streamifier";

export const addUser = async(req,res) => {
    try{
        const { name,email,role } = req.query

        const check = await User.find({email})
        if(check){
          res.status(409).json({message:"user already exists"})
        }
        const newUser = await User.create({name,email,role});
        res.status(201).json({
            message: "User added successfully",
            user:newUser
          });
    }
    catch(error){
        console.error(" addUser error:", error);
        res.status(500).json({ message: "Error occured " });
    }

}

export const editProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    let updateData = req.body;

    // If image file exists → upload to Cloudinary
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          { folder: "profile_images", resource_type: "image" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(upload);
      });

      updateData.profileImage = uploadResult.secure_url;
      updateData.profileImagePublicId = uploadResult.public_id;
    }

    const updated = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    console.log(updated)
    res.status(200).json({
      success: true,
      user: updated,
    });
  } catch (err) {
    console.error("Edit profile error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


export const viewProfile = async(req,res) => {
    try{

        const {userId} = req.params
        const userdata = await User.findById(userId)

        if(!userdata)
            return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            message:"user data fetched successfully",
            user:userdata
        })
    }
    catch(error){
        console.error("View profile error:", error);
        res.status(500).json({ message: "Error fetching profile" });
    }
}

export const getallProfiles = async(req,res) => {
    try{
        const allprofiles = await User.find({activeStatus:true})
        res.status(200).json({
            message:"all profiles fetched successfully",
            users:allprofiles
        })
    }
    catch(error){
        console.error(" getallprofiles error:", error);
        res.status(500).json({ message: "Error fetching allprofile" });  
    }
}

export const deactivateUser = async (req, res) => {
  try {
    const userId = req.params.id; 

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isActive) {
      return res.status(400).json({ message: "User is already deactivated" });
    }

    user.isActive = false;
    await user.save();

    res.status(200).json({
      message: "User deactivated successfully",
      user
    });
  } catch (error) {
    console.error("Deactivate user error:", error);
    res.status(500).json({ message: "Error occurred while deactivating user" });
  }
};


export const searchUserbyid = async (req,res) => {
    try{
        const userId = req.params.id
        const user = await User.findById(userId)

        if(!user)
            return res.status(404).json({message:"user not found"})

        res.status(200).json({
            message:"user found",
            user
        })
    }
    catch(error){
        console.error("search user error:", error)
        res.status(500).json({ message: "Error occurred while searching user" });
    }
}

export const searchByBatch = async (req, res) => {
  try {
    const { batch } = req.query;

    if (!batch) {
      return res.status(400).json({ message: "Batch is required" });
    }

    const users = await User.find({ batch , isActive: true});

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found for this batch" });
    }

    res.status(200).json({
      message: "Users found successfully",
      users
    });

  } catch (error) {
    console.error("Search users error:", error);
    res.status(500).json({ message: "Error occurred while searching users" });
  }
};


export const searchByYearAndBatch = async (req, res) => {
  try {
    const { year, batch } = req.query;

    if (!year && !batch)
      return res.status(400).json({ message: "Provide year or batch" });

    const filter = {};

    if (batch) filter.batch = batch;

    if (year) filter.year = year
    filter.isActive=true

    const users = await User.find(filter);

    if (users.length === 0)
      return res.status(404).json({ message: "No matching users found" });

    res.status(200).json({
      message: "Users found successfully",
      users
    });

  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Error occurred during search" });
  }
};

export const searchbyrole = async (req, res) => {
    try{
        const {role} = req.query

        if(!role)
            return res.status(400).json({message:"provide role"})

        const users = await User.find({role})

        if(users.length === 0 )
            return res.status(404).json({message:"users not found by using role"})

        console.log(users)
        res.status(200).json({
            message:"users found",
            users
        })
    }
    catch(error){
        console.error("Error :",error)
        res.status(500).json({message:"Error occured in searchbyRole"})
    }
}

export const getDeactivatedUser = async(req,res) => {
    try{
        const allprofiles = await User.find({isActive:false})
        res.status(200).json({
            message:"all profiles fetched successfully",
            users:allprofiles
        })
    }
    catch(error){
        console.error(" getallprofiles error:", error);
        res.status(500).json({ message: "Error fetching allprofile" });  
    }
}

export const uploadAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // multer-storage-cloudinary sets req.file.path (or req.file.secure_url)
    const url = req.file.path || req.file.secure_url || req.file.url;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profileImage = url;
    await user.save();

    return res.status(200).json({ message: "Profile image uploaded", profileImage: url });
  } catch (err) {
    console.error("uploadAvatar error:", err);
    return res.status(500).json({ message: "Upload failed" });
  }
};