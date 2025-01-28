import UserModel from "../models/UserModel.js";

export const create=async(req,res)=>{
    try{
        const userData=new UserModel(req.body);
        if(!userData){
            return res.status(404).json({msg:"user data not found"});
        }
        const savedData=await userData.save();
        res.status(200).json(savedData)
    }
    catch(error){
        res.status(500).json({error:error});
    }
}
export const getAll=async(req,res)=>{
    try{
        const userData=await UserModel.find();
        if(!userData){
            return res.status(404).json({msg:"user data not found"})
        }
        res.status(200).json(userData)    }
    catch(error){
        res.status(500).json({error:error});
    }
}
export const getOne=async(req,res)=>{
    try{
      const id=req.params.id;
      const userExist=await UserModel.findById(id);
      if(!userExist){
        return res.status(404).json({msg:"user not found"})
      }
      res.status(200).json(userExist);
    }
    catch(error){
        res.status(500).json({error:error})
    }}
export const update=async(req,res)=>{
    try{
        const id=req.params.id;
        const userExist=await UserModel.findById(id);
        if(!userExist){
            return res.status(404).json({msg:"user not found"})
        }
        const updatedData=await UserModel.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json({msg:"User updated successfully"})
    }
    catch(error){
        res.status(500).json({error:error})    }
}

export const deleteUser = async (req, res) => {
    try {
        console.log("DELETE request received for ID:", req.params.id);

        const id = req.params.id;
        const userExist = await UserModel.findById(id);

        if (!userExist) {
            console.log("User not found with ID:", id);
            return res.status(404).json({ msg: "User does not exist" });
        }

        await UserModel.findByIdAndDelete(id);
        console.log("User deleted successfully with ID:", id);
        res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        console.error("Error in deleteUser function:", error);
        res.status(500).json({ error });
    }
};




