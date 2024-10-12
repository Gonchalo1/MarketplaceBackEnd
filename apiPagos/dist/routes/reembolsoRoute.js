"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Cambia a import
const reembolsoController_1 = require("../controller/reembolsoController"); // Asegúrate de que esta importación sea correcta
const router = express_1.default.Router();
// Ruta para procesar un reembolso
router.post('/payments/:id/refund', reembolsoController_1.refundPayment);
// Exporta el router como un módulo
exports.default = router;
