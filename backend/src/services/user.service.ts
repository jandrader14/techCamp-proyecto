import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';

export const userService = {
    getAll: async () => {
        return await User.find();
    },

    create: async (entity: { name: string; email: string; password: string }) => {
        console.log('📩 Datos recibidos en userService.create:', entity);
       

        if (!entity.name || !entity.email || !entity.password) {
            throw new Error('Todos los campos son requeridos');
        }
        

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email: entity.email });
        if (existingUser) {
            throw new Error('El usuario con este correo ya existe');
        }

        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(entity.password, 10);

        // Crear el nuevo usuario con la contraseña hasheada
        const newUser = new User({
            name: entity.name,
            email: entity.email,
            password: hashedPassword,
        });

        // Guardar el usuario en la base de datos
        try {
            await newUser.save();
        } catch (error) {
            console.error('Error al guardar el usuario:', error);
            throw new Error('Error al guardar el usuario');
        }

        return newUser;  // Devuelves el usuario creado, excluyendo la contraseña
    },

    update: async (id: string, body: object) => {
        return await User.findByIdAndUpdate(id, body);
    },

    delete: async (id: string) => {
        return await User.findByIdAndDelete(id);
    },
    findByEmail: async (email: string) => {
        return await User.findOne({ email });
    }


};