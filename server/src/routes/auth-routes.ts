import { Router, Request, Response } from 'express';
import { User } from '../models/user.js'; // import user model
import jwt from 'jsonwebtoken'; // import JWT library
import bcrypt from 'bcrypt'; // import bcrypt for password hashing

//Login function to authenticate a user
export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token

  //Extract username and password from the request body
  const {username, password} = req.body; 

  //find the user in the database by username
  const user = await User.findOne({
    where: {username}
  });

  // if user is not found, return to FE by sending an authentication failed response
  if (!user) {
    return res.status(401).json({message: 'Authentication failed - Username is incorrect'});
  }

  //If the user is found, then compare the provided password with the stored bcrypt hashed password
  const passwordIsValid = await bcrypt.compare(password,user.password);

  // if password is invalid, return to FE by sending an authentication failed response
  if(!passwordIsValid) {
    return res.status(401).json({message: 'Authentication failed - Password is incorrect'})
  }

  //if the password is correct, now get the secretkey from the .env file
  const secretKey = process.env.JWT_SECRET_KEY || '';

  //generate a JWT Token for the authenticated user
  const token = jwt.sign({username},secretKey,{expiresIn: '1h'});

  //return the token as a JSON response
  return res.json({token});
};

//create a new router instance
const router = Router();

// POST /login - Login a user successfully and define the login route
router.post('/login', login);

//export the router instance
export default router;
