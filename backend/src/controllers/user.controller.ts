import { Request, Response } from 'express';

import { userService } from '../services'

export const userController ={
  getAllUsers: async(req: Request, res: Response) => {
        try {
            const data = await userService.getAll();
            return res.json(data);
        } catch (error:any) {
            res.status(500).json({message: error.message});
            
        }
    }
};

