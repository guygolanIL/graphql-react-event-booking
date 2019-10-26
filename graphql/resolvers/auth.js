const User = require("../../models/user");
const bcrypt = require("bcryptjs");

exports.authResolvers = {
  createUser: async args => {
    try {
      const userDoc = await User.findOne({ email: args.userInput.email });
      if (userDoc) {
        throw new Error("User Exists Already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const newUser = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      const savedUser = await newUser.save();
      return { ...savedUser._doc, password: null, _id: savedUser.id };
    } catch (err) {
      throw err;
    }
  }
};


