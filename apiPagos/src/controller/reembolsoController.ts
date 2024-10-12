import { Request, Response } from 'express';
import Pagos from '../models/pagos'; // Asegúrate de que los modelos estén tipados correctamente
import axios from 'axios';

// Controlador para procesar un reembolso
export const refundPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // ID del pago a reembolsar
    const { amount } = req.body; // Monto del reembolso (opcional)
    const xIdempotencyKey = `refund-${id}-${Date.now()}`; // Llave idempotente para evitar duplicados

    // Buscar el pago en la base de datos
    const pago = await Pagos.findOne({ where: { pedido_id: id } });

    if (!pago) {
      res.status(404).json({ error: 'Pago no encontrado' });
      return;
    }

    // Crear el cuerpo de la solicitud de reembolso
    const data: { amount?: number } = {}; // Tipar el cuerpo de la solicitud
    if (amount) {
      data.amount = amount;
    }

    // Realizar la solicitud de reembolso a Mercado Pago
    const response = await axios.post(
      `https://api.mercadopago.com/v1/payments/${id}/refunds`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${process.env.MERCADO_PAGO_TOKEN}`, // Aquí usamos la variable de entorno correctamente
          'X-Idempotency-Key': xIdempotencyKey,
        },
      }
    );

    // Manejo de la respuesta
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Error al procesar el reembolso:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error al procesar el reembolso' });
  }
};
