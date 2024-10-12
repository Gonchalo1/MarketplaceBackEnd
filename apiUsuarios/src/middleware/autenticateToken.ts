import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Extraer el token de la cabecera 'Authorization'

  if (!token) {
    res.status(403).json({ error: 'No token provided' });
    return; // Aseguramos que no siga después de la respuesta
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: 'Failed to authenticate token' });
      return; // Aseguramos que no siga después de la respuesta
    }

    req.user = decoded; // Almacenar la información decodificada del token en `req.user`
    next(); // Llamar a `next()` si la autenticación es exitosa
  });
};

export default authMiddleware;
