import express from 'express'; // Cambia a import
import { refundPayment } from '../controller/reembolsoController'; // Asegúrate de que esta importación sea correcta

const router = express.Router();

// Ruta para procesar un reembolso
router.post('/payments/:id/refund', refundPayment);

// Exporta el router como un módulo
export default router; 
