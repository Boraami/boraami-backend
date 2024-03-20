import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import mongoSanitize from 'express-mongo-sanitize';
import userRoutes from './Routes/userRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.dbUrl as string)
  .then(() => console.log("Successfully connected to database"))
  .catch(err => console.error(err));

app.use(bodyParser.json());

app.use(mongoSanitize());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
