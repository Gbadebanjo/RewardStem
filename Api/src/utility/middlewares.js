import jwt from 'jsonwebtoken';
import { config } from "dotenv";
import { signUp, transaction, Login } from './validator.js';

export function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
export function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    console.log(`token: `,token)

  if (!token) {
    return res.status(403).json({
      status: 403,
      message: 'Authentication failed'
    });
  }
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    console.log(decoded)
    next();

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: 'An error occurred while authenticating the user, Please signin again!'
    });
  }
};
export function validateSignUp(req, res, next) {
  const { error } = signUp.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }
  next();
}
export function validateLogin(req, res, next) {
  const { error } = Login.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }
  next();
}
export function validateTransaction(req, res, next) {
  const { error } = transaction.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }
  next();
}


