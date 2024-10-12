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
exports.refundPayment = void 0;
const pagos_1 = __importDefault(require("../models/pagos")); // Asegúrate de que los modelos estén tipados correctamente
const axios_1 = __importDefault(require("axios"));
// Controlador para procesar un reembolso
const refundPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params; // ID del pago a reembolsar
        const { amount } = req.body; // Monto del reembolso (opcional)
        const xIdempotencyKey = `refund-${id}-${Date.now()}`; // Llave idempotente para evitar duplicados
        // Buscar el pago en la base de datos
        const pago = yield pagos_1.default.findOne({ where: { pedido_id: id } });
        if (!pago) {
            res.status(404).json({ error: 'Pago no encontrado' });
            return;
        }
        // Crear el cuerpo de la solicitud de reembolso
        const data = {}; // Tipar el cuerpo de la solicitud
        if (amount) {
            data.amount = amount;
        }
        // Realizar la solicitud de reembolso a Mercado Pago
        const response = yield axios_1.default.post(`https://api.mercadopago.com/v1/payments/${id}/refunds`, data, {
            headers: {
                'Authorization': `Bearer ${process.env.MERCADO_PAGO_TOKEN}`, // Aquí usamos la variable de entorno correctamente
                'X-Idempotency-Key': xIdempotencyKey,
            },
        });
        // Manejo de la respuesta
        res.status(200).json(response.data);
    }
    catch (error) {
        console.error('Error al procesar el reembolso:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        res.status(500).json({ error: 'Error al procesar el reembolso' });
    }
});
exports.refundPayment = refundPayment;
