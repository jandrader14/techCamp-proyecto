import express from 'express';
import cors from 'cors';
import morgan from 'morgan'; // Import morgan for logging

import {connectDB} from './database/index.ts'

export class Server{
  private app: express.Application;

  constructor(){
    this.app = express();
    connectDB(); // Connect to the database
    this.configuration();
    this.middlewares();
    this.routes(); // Ensure routes are initialized
  }

  configuration(){
    this.app.set('port', 5000);
    
  }

  middlewares(){
    this.app.use(morgan('dev'));
    this.app.use(cors()); // Add morgan middleware for logging
    this.app.use(express.json());
  }
  routes(){
    this.app.get('/', (req, res) => {
      res.json({ message: 'Welcome to the API' });      
    });
  }

  listen(){
    this.app.listen(this.app.get('port'), () => 
    {
      console.log(`✅ Server running on http://localhost:${this.app.get('port')}`);
    });
  }
}
