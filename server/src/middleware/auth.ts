import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

//interface for the JWT Payload
interface JwtPayload {
  username: string;
}

//Middleware function to authenticate JWT token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object

  //Get the Authorization header from the request which should contain the JWT bearer token
  const authHeader = req.headers.authorization;

  //check if the Authorization Header is present
  if (authHeader) {
    //Extract the token from the Authorization Header "Bearer axE...."
    const token = authHeader.split('')[1];

    //Get the secret key from the environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';

    //Verify the JWT Token to see if it belongs to the server using the secretkey
    jwt.verify(token,secretKey,(err,user) => {
      //if error due to token being invalid, then send forbidden status to FE
      if (err) {
        return res.sendStatus(403);
      }

      //If token valid, attach the user information to the request object
      req.user = user as JwtPayload;
      //call the next Middleware function
      return next();
    });
  } else {
    //If Authorization Header is not present, send unauthorized status to FE
    res.sendStatus(401); 
  }
};
