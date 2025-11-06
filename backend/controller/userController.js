const User = require("../model/user");
const cloudinary = require("../config/cloudinary");

exports.createProfile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
     let avatar = {};
     if (req.file) {
       const uploadResult = await cloudinary.uploader.upload(req.file.path, {
         folder: "avatars",
       });
       avatar = {
         public_id: uploadResult.public_id,
         url: uploadResult.secure_url,
       };
       
     }

     const newUser = await User.create({
       name,
       email,
       phone,
       address,
       avatar,
     });

     res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    let avatarData = user.avatar;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "avatars",
      });
      avatarData = { public_id: result.public_id, url: result.secure_url };
    }

    user.name = name;
    user.email = email;
    user.phone = phone;
    user.address = address;
    user.avatar = avatarData;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
