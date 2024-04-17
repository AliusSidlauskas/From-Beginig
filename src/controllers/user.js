import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

export const SIGN_IN = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("req.body.password", salt);

    const user = new UserModel({
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      password: hash,
      game: [],
    });

    const response = await user.save();

    return res.status(200).json({ user: response });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "bad data" });
  }
};

export const LOG_IN = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "mail data" });
    }
    const isPasswordMatch = bcrypt.compareSync(
        req.body.password,
        user.password
    );

    
    console.log(user.password)



    if (!isPasswordMatch) {
      return res.status(400).json({ message: "password data" });
    }

    const jwt_token = jwt.sign(
      { email: user.email, user_id: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "15h",
      }
    );
    return res.status(200).json({ jwt_token: jwt_token });
  } catch (err) {
    console.log(err);
  }
};
