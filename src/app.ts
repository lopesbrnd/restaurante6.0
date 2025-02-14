import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config(); // Isso vai carregar as variáveis de ambiente do arquivo .env
import clienteRoutes from './router/clienteRouter';
import garcomRoutes from './router/garcomRouter';
import mesaRoutes from './router/mesaRouter';
import pedidopratoRoutes from './router/pedidopratoRouter';
import pedidosRoutes from './router/pedidosRouter';
import pratoRoutes from './router/pratoRouter';

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
