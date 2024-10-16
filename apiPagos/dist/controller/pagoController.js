"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentMethods = exports.getPaymentById = exports.payments = void 0;
const mercadopago = require('mercadopago');
const axios_1 = __importDefault(require("axios"));
const pagos_1 = __importDefault(require("../models/pagos")); // Importa el modelo de Pagos
// Función para inicializar el SDK de Mercado Pago
const initMercadoPago = () => {
    mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_TOKEN);
};
// Llama a la función para configurar Mercado Pago
initMercadoPago();
// Controlador para crear una preferencia de pago (Checkout API)
const payments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("REQUEST BODY", req.body);
    const preference = {
        items: [
            {
                title: req.body.description, // Descripción del producto
                unit_price: Number(req.body.transaction_amount), // Monto
                quantity: 1
            }
        ],
        payer: {
            email: req.body.email,
            identification: {
                type: req.body.identificationType, // Tipo de documento (DNI, CUIT, etc.)
                number: req.body.number // Número del documento
            }
        },
        payment_methods: {
            excluded_payment_types: [
                { id: 'ticket' } // Excluye ciertos métodos de pago si es necesario
            ]
        },
        back_urls: {
            success: "https://www.tusitio.com/success",
            failure: "https://www.tusitio.com/failure",
            pending: "https://www.tusitio.com/pending"
        },
        auto_return: "approved",
        notification_url: "https://www.tusitio.com/webhook" // URL para notificaciones de pago
    };
    try {
        // Crea la preferencia de pago en Mercado Pago
        const response = yield mercadopago.preferences.create(preference);
        console.log("PREFERENCE RESPONSE", response);
        const pedido_id = response.id; // ID de la preferencia generada
        // Guarda la información del pago en la base de datos
        const pagoData = {
            pedido_id: pedido_id,
            monto: req.body.transaction_amount,
            metodo_pago: req.body.paymentMethodId,
            estado: 'pendiente', // El estado inicial del pago
            fecha_transaccion: new Date(),
            detalles_transaccion: response // Guarda la respuesta completa
        };
        const nuevoPago = yield pagos_1.default.create(pagoData); // Guarda el pago en la base de datos
        // Envía la preferencia al frontend con la URL de pago
        res.status(200).json({
            init_point: response.init_point, // URL para redirigir al checkout
            nuevoPago
        });
    }
    catch (error) {
        console.error("ERROR AL CREAR PAGO", error);
        res.status(400).json({ error: 'Error al procesar el pago' });
    }
});
exports.payments = payments;
// Controlador para obtener un pago por id
const getPaymentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!Number.isInteger(+id)) {
            res.status(400).json({ error: 'ID de pago inválido' });
            return;
        }
        const pago = yield pagos_1.default.findByPk(id);
        if (!pago) {
            res.status(404).json({ error: 'Pago no encontrado' });
            return;
        }
        res.json(pago);
    }
    catch (error) {
        console.error('Error al obtener el pago:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});
exports.getPaymentById = getPaymentById;
// Controlador para obtener los métodos de pago
const getPaymentMethods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get('https://api.mercadopago.com/v1/payment_methods', {
            headers: {
                Authorization: `Bearer ${process.env.MERCADO_PAGO_TOKEN}`
            }
        });
        res.status(200).json(response.data);
    }
    catch (error) {
        console.error('Error al obtener los métodos de pago:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error al obtener los métodos de pago' });
    }
});
exports.getPaymentMethods = getPaymentMethods;
