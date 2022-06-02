const UserModel = require("../models/userSchema");

// create a post | POST METHOD

const createUser = async (req, res) => {
  const { name, email, age, mobile, address, desc, work } = req.body;

  if (!name || !email || !age || !mobile || !work || !address || !desc) {
    return res.status(404).json("please fill the all field!");
  }

  try {
    const preUser = await UserModel.findOne({ email: email });
    console.log("preUser : ", preUser);

    if (preUser) {
      return res.status(404).json({ message: "email already exist!" });
    } else {
      //   create a new user
      const user = new UserModel({
        name,
        email,
        age,
        mobile,
        address,
        desc,
        work,
      });

      // save on db
      await user.save();
      return res.status(201).json({ user });
    }
  } catch (err) {
    return res.status(404).send(err);
  }
};

// get all data | GET METHOD
const getAllInfo = async (req, res) => {
  try {
    const allUsers = await UserModel.find();

    return res.status(200).json({ allUsers });
  } catch (err) {
    return res.status(404).json(err);
  }
};

// get singleUser data | GET METHOD
const singleUser = async (req, res) => {
  const { id } = req.params;

  try {
    const singleUser = await UserModel.findById({ _id: id });
    return res.status(200).json({ singleUser });
  } catch (err) {
    return res.status(400).json(err);
  }
};

// update user | PUT METHOD
const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const updateUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({ updateUser });
  } catch (err) {
    return res.status(400).json(err);
  }
};

// deleted user | DELETE METHOD
const deletedUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUser = await UserModel.findByIdAndDelete(id);

    return res.status(200).json({ deleteUser });
  } catch (err) {
    return res.status(400).json({ deleteUser });
  }
};

// exports
module.exports = {
  createUser,
  getAllInfo,
  singleUser,
  updateUser,
  deletedUser,
};
