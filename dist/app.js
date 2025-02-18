import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config(); // Isso vai carregar as variáveis de ambiente do arquivo .env
import clienteRoutes from './router/clienteRouter.js';
import garcomRoutes from './router/garcomRouter.js';
import mesaRoutes from './router/mesaRouter.js';
import pedidopratoRoutes from './router/pedidopratoRouter.js';
import pedidosRoutes from './router/pedidosRouter.js';
import pratoRoutes from './router/pratoRouter.js';
const app = express();
app.use(cors()); // Permitir requisições de diferentes origens
app.use(express.json()); // Para manipular requisições JSON
// Configuração das rotas
app.use('/api/clientes', clienteRoutes);
app.use('/api/garcom', garcomRoutes);
app.use('/api/mesa', mesaRoutes);
app.use('/api/pedidoprato', pedidopratoRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/prato', pratoRoutes);
console.log('Rotas carregadas corretamente!');
app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});
