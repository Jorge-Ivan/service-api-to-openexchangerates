import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const jwt_secret:string = process.env.JWT_SECRET_KEY||'';
const firebaseConfig = {
    apiKey: process.env.API_KEY!,
    authDomain: process.env.AUTH_DOMAIN!,
    projectId: process.env.PROJECT_ID!,
    storageBucket: process.env.STORAGE_BUCKET!,
    messagingSenderId: process.env.MESSAGING_SENDER_ID!,
    appId: process.env.APP_ID!
};

const firebaseApp = initializeApp(firebaseConfig);

// Register user
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        res.status(200).send('User created successfully');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error creating in:', errorCode, errorMessage);
        res.status(400).send('Error creating user');
        
      });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).send('Error creating user');
  }
};

// Inicio de sesión
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const auth = getAuth();
    signInWithEmailAndPassword (auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const token = jwt.sign({ user }, jwt_secret, { expiresIn: '1h' });
        res.status(200).json({ token });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error signing in:', errorCode, errorMessage);
        res.status(400).json({ message: 'Invalid email or password' });
        
      });
    
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(400).json({ message: 'Invalid email or password' });
  }
};
