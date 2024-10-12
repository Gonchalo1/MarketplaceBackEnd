import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import User from '../models/userModel'; // Asegúrate de que la ruta sea correcta

// Crear un nuevo usuario
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, address, phone } = req.body;
  try {
    // Generar hash de la contraseña
    const password_hash = await argon2.hash(password);

    // Crear usuario con el hash de la contraseña
    const user = await User.create({ name, email, password_hash, address, phone });

    // Generar token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    // Retornar el ID del usuario y el token
    res.status(201).json({ id: user.id, token });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Login de usuario
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const isMatch = await argon2.verify(user.password_hash, password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.json({ token });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un usuario por ID
export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, { attributes: ['id', 'name', 'email', 'address', 'phone', 'register_date'] });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un usuario
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, email, password, address, phone } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password_hash = password; // Será encriptada automáticamente por el hook
    if (address) user.address = address;
    if (phone) user.phone = phone;

    await user.save();
    res.json({ message: 'User updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Solicitar recuperación de contraseña
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Generar un token de restablecimiento de contraseña
    const resetToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    // Aquí puedes enviar el token por correo electrónico

    res.json({ message: 'Password reset link sent', resetToken });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Restablecer contraseña
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { resetToken, newPassword } = req.body;
  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    const user = await User.findByPk(decoded.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    user.password_hash = newPassword; // Será encriptada automáticamente por el hook
    await user.save();

    res.json({ message: 'Password has been reset successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
