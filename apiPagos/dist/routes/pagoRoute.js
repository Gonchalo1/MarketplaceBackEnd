"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importaciones
const express_1 = __importDefault(require("express"));
const pagoController_1 = require("../controller/pagoController");
// Crear una instancia de Router
const router = express_1.default.Router();
// Ruta para crear un pago
router.post('/payments', (req, res) => {
    (0, pagoController_1.payments)(req, res);
});
// Ruta para obtener un pago por su id
router.get('/payments/:id', (req, res) => {
    (0, pagoController_1.getPaymentById)(req, res);
});
// Ruta para obtener métodos de pago disponibles
router.get('/payments/methods', (req, res) => {
    (0, pagoController_1.getPaymentMethods)(req, res);
});
exports.default = router;
