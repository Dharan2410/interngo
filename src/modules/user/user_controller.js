import User from "./user_model.js"


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

export const editProfile = async (req,res)=>{
    try
    {
        const {name,email,phone, slackid,profileImage,dob,gender,address,degree,college,batch,skills } = req.body

        const userid = req.user?.id;
        if(!userid)
            return res.status(401).json({message:"unAuthorized user"})

        const updateData = Object.fromEntries(
            Object.entries(req.body).filter(([k,v])=> v!== undefined)
        )

        const updatedUser = await User.findByIdAndUpdate(userid,updateData,{
            new:true,
            runValidators:true

        })

        res.status(200).json({
            message:"profile edited successfully",
            user:updatedUser
        })

    }
    catch(error){
        console.error("updating the profile failed:", error.message)
        res.status(500).json({message:"error occured in editing the profile"})
    }
}


export const viewProfile = async(req,res) => {
    try{

        const userid = req.user.id
        const userdata = await User.findById(userid)

        if(!user)
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
        const allprofiles = await User.find({isActive:true})
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

export const searchbyrole = async (res,req) => {
    try{
        const {role} = res.query

        if(!role)
            return res.status(400).json({message:"provide role"})

        const users = await User.find({role})

        if(users.length === 0 )
            return res.status(404).json({message:"users not found by using role"})

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
