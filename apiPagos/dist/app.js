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
// Importaciones
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const pagoRoute_1 = __importDefault(require("./routes/pagoRoute"));
const reembolsoRoute_1 = __importDefault(require("./routes/reembolsoRoute"));
const db_1 = require("./db/db");
dotenv_1.default.config(); // Cargar las variables de entorno
// Crear una instancia de Express
const app = (0, express_1.default)();
// Configurar el middleware para parsear JSON
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Prefijos para las rutas de pagos y reembolsos
app.use('/api', pagoRoute_1.default, reembolsoRoute_1.default);
// Configurar una ruta básica
app.get('/', (req, res) => {
    res.send('¡Hola, mundo xd!');
});
// Servir archivos estáticos (opcional)
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Configurar el puerto y escuchar peticiones
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    // Probar la conexión a la base de datos
    yield (0, db_1.testConnection)();
}));
// Manejo de errores de ruta no encontrada
app.use((req, res, next) => {
    res.status(404).send('Página no encontrada');
});
// Manejo de errores del servidor
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error del servidor');
});
// Comentarios adicionales
// Hice todo, nomás no se puede hacer el reembolso porque hay que poner datos reales y hacer un pago real, cosa que se supone que no tenemos que hacerlo
// Así que estoy limitado por hacer proyectos ficticios, igualmente el resto de las funcionalidades están terminadas, así que mi trabajo termina aquí.
// La petición se manda de manera manual, pasando en los headers el token y la llave para no repetir la petición (X-idempotency-key) y se pasa el id del pedido en la url (se saca ese id por la base de datos)
// Me olvidé que tenia que hacerlo con checkout api xd, no se porqué pero no me deja levantarlo por una funcion que esta mal al momento de compilar con tsc, una vez resuelva eso hay que testear.
