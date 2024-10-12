// Importaciones
import express, { Request, Response } from 'express';
import { payments, getPaymentById, getPaymentMethods } from '../controller/pagoController';

// Crear una instancia de Router
const router = express.Router();

// Ruta para crear un pago
router.post('/payments', (req: Request, res: Response) => {
  payments(req, res);
});

// Ruta para obtener un pago por su id
router.get('/payments/:id', (req: Request, res: Response) => {
  getPaymentById(req, res);
});

// Ruta para obtener métodos de pago disponibles
router.get('/payments/methods', (req: Request, res: Response) => {
  getPaymentMethods(req, res);
});

export default router;
