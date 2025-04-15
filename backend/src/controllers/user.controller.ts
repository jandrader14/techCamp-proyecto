import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
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
    },
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body;
    
        try {
            const user = await userService.findByEmail(email);
    
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
    
            // Comparar la contraseña ingresada con la guardada (hasheada)
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }
    
            // Si pasa la validación
            return res.status(200).json({
                message: 'Inicio de sesión exitoso',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                    // ¡Nunca envíes la contraseña!
                }
            });
        } catch (error: any) {
            console.error('Error al iniciar sesión:', error);
            return res.status(500).json({ message: 'Error en el servidor', error: error.message });
        }

    }
}

