import { Request, Response } from 'express';
import mercadopago from 'mercadopago'; // SDK oficial de Mercado Pago
import axios from 'axios';
import Pagos from '../models/pagos'; // Importa el modelo de Pagos

// Función para inicializar el SDK de Mercado Pago
const initMercadoPago = (): void => {
    mercadopago.configure({
        access_token: process.env.MERCADO_PAGO_TOKEN as string, // Asegúrate de que el token sea correcto
    });
};

// Llama a la función para configurar Mercado Pago
initMercadoPago();

// Controlador para crear una preferencia de pago (Checkout API)
export const payments = async (req: Request, res: Response): Promise<void> => {
    console.log("REQUEST BODY", req.body);

    const preference = {
        items: [
            {
                title: req.body.description,  // Descripción del producto
                unit_price: Number(req.body.transaction_amount),  // Monto
                quantity: 1
            }
        ],
        payer: {
            email: req.body.email,
            identification: {
                type: req.body.identificationType,  // Tipo de documento (DNI, CUIT, etc.)
                number: req.body.number  // Número del documento
            }
        },
        payment_methods: {
            excluded_payment_types: [
                { id: 'ticket' }  // Excluye ciertos métodos de pago si es necesario
            ]
        },
        back_urls: {
            success: "https://www.tusitio.com/success",
            failure: "https://www.tusitio.com/failure",
            pending: "https://www.tusitio.com/pending"
        },
        auto_return: "approved",
        notification_url: "https://www.tusitio.com/webhook"  // URL para notificaciones de pago
    };

    try {
        // Crea la preferencia de pago en Mercado Pago
        const response = await mercadopago.preferences.create(preference);
        console.log("PREFERENCE RESPONSE", response);

        const pedido_id = response.id;  // ID de la preferencia generada

        // Guarda la información del pago en la base de datos
        const pagoData = {
            pedido_id: pedido_id,
            monto: req.body.transaction_amount,
            metodo_pago: req.body.paymentMethodId,
            estado: 'pendiente',  // El estado inicial del pago
            fecha_transaccion: new Date(),
            detalles_transaccion: response  // Guarda la respuesta completa
        };

        const nuevoPago = await Pagos.create(pagoData);  // Guarda el pago en la base de datos

        // Envía la preferencia al frontend con la URL de pago
        res.status(200).json({
            init_point: response.init_point,  // URL para redirigir al checkout
            nuevoPago
        });
    } catch (error: any) {
        console.error("ERROR AL CREAR PAGO", error);
        res.status(400).json({ error: 'Error al procesar el pago' });
    }
};

// Controlador para obtener un pago por id
export const getPaymentById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!Number.isInteger(+id)) {
            res.status(400).json({ error: 'ID de pago inválido' });
            return;
        }

        const pago = await Pagos.findByPk(id);

        if (!pago) {
            res.status(404).json({ error: 'Pago no encontrado' });
            return;
        }

        res.json(pago);
    } catch (error: any) {
        console.error('Error al obtener el pago:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Controlador para obtener los métodos de pago
export const getPaymentMethods = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await axios.get('https://api.mercadopago.com/v1/payment_methods', {
            headers: {
                Authorization: `Bearer ${process.env.MERCADO_PAGO_TOKEN!}`
            }
        });
        res.status(200).json(response.data);
    } catch (error: any) {
        console.error('Error al obtener los métodos de pago:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error al obtener los métodos de pago' });
    }
};
