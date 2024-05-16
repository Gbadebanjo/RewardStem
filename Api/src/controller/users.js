import User from '../models/users.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utility/utils.js';
import { config } from "dotenv";

export const signUp = async (req, res) => {
  
    const { username, email, password } = req.body;
    
    try {
      const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
        return  res.status(400).json({ 
            message: 'A user with this email already exists'
        });
      }
      const existingUsername = await User.findOne({ email: email });
        if (existingUsername) {
        return  res.status(400).json({ 
            message: 'A user with this username already exists'
        });
      }


      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 8);
  
      // Create a new user
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword
      });
  
        return res.status(200).json({
          message: 'User created successfully',
           user: newUser
        })
  
    } catch (error) {
      console.log(error);
        return res.status(500).json({
            message: 'An error occurred while creating the user'
        });
    }
  }

  export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email: email });
  
      if (!user) {
        return res.status(400).json({
          message: 'User not found'
        });
      }
  
      // Compare the provided password with the stored password
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({
          message: 'Invalid password, Kindly try again!'
        });
      }
      const token = generateToken(user.userId);
  
      return res.cookie('jwt', token,
        {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7
        })
        .status(200).json({
        message: 'Logged in successfully',
        user: user,
        token
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: 'An error occurred while logging in'
      });
    }
  };