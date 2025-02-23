import userModel from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userMutations = {
  async register(_, { user }) {
    try {
      if (!user.name || !user.email || !user.password) {
        throw new Error("Name, email and password are required");
      }
      const newUser = await userModel.create(user);
      return newUser;
    } catch (error) {
      console.log(error.message);
    }
  },

  async login(_, { user }) {
    try {
      const { email, password } = user;

      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const foundedUser = await userModel.findOne({ email });
      if (!foundedUser) {
        throw new Error("User not found");
      }

      const isMatch = await bcrypt.compare(password, foundedUser.password);
      if (!isMatch) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign(
        { id: foundedUser._id },
        process.env.JWT_SECRET || "secret"
      );

      return token;
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default userMutations;
