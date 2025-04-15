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
    },
    
    create: async (req: Request, res: Response) => {
        console.log('Body recibido:', req.body);
        try {
            const userData = req.body;
            const newUser = await userService.create(userData);
            return res.status(201).json({
                message: 'Usuario creado correctamente',
                user: newUser,
            });
        } catch (error: any) {
            console.error('Error al crear el usuario:', error); // Log del error
            return res.status(500).json({
                message: 'Hubo un problema al crear el usuario',
                error: error.message,  // Mensaje detallado del error
            });
        }
    }, 
    update: async(req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const data = await userService.update(id, req.body);
            return res.json(data);            
        } catch (error:any) {
            res.status(500).json({message: error.message});
            
        }
    }, 
    delete: async(req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const data = await userService.delete(id);
            return res.json(data);
        } catch (error:any) {
            res.status(500).json({message: error.message});
            
        }
    }

};

