import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

    return res.status(200).json({ message: 'Login exitoso' });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};
