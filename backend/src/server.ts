// src/server/server.ts
import express, {Express} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan'; // Import morgan for logging

export class Server{
  private app:Express;

  constructor(){
    this.app = express();
    this.configuration();
  }

  configuration(){
    this.app.set('port', process.env.PORT || 5000);
  }

  routes(){
    this.app.get('/')
  }

  listen(){
    this.app.listen(this.app.get('port'), () => 
    {
      console.log(`✅ Server running on http://localhost:${this.app.get('port')}`);
    })
  }
}
