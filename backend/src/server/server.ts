import express from 'express';
import cors from 'cors';
import morgan from 'morgan'; // Import morgan for logging

import {connectDB} from '../database/index.ts'
import {PORT} from '../config/index.ts'
import {routes} from '../routes/index.ts'



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
    this.app.set('port', PORT || 5000);
    
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
    this.app.use('/api/users', routes.UserRoute);
  }

  listen(){
    this.app.listen(this.app.get('port'), () => 
    {
      console.log(`✅ Server running on http://localhost:${this.app.get('port')}`);
    });
  }
}
