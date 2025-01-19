import { Prato } from "./Prato.js";
import { Mesa } from "./Mesa.js";
import { Garcom } from "./Garcom.js";
import { Pedido } from "./Pedido.js";
import { Cliente } from "./Cliente.js";
// Exemplo de uso
const prato1 = new Prato("Pizza Margherita", 30.00, ''); // 2 pizzas
const prato2 = new Prato("Espaguete à Carbonara", 40.00, '');
const prato3 = new Prato("Salada Caesar", 20.00, ''); // 3 saladas
const cliente1 = new Cliente("João Silva", '');
const cliente2 = new Cliente("Maria Oliveira", '');
const garcom = new Garcom("Carlos");
const mesa1 = new Mesa("MESA 1", 1);
const mesa2 = new Mesa("MESA 2", 2);
// Registrar pedido para a mesa 1
const pedidoJoao = new Pedido(cliente1);
pedidoJoao.adicionarPrato(prato1); // 2 Pizza Margherita
pedidoJoao.adicionarPrato(prato2); // 1 Espaguete à Carbonara
garcom.registrarPedido(mesa1, pedidoJoao);
// Registrar pedido para a mesa 2
const pedidoMaria = new Pedido(cliente2);
pedidoMaria.adicionarPrato(prato3); // 3 Saladas Caesar
garcom.registrarPedido(mesa2, pedidoMaria);
// Calcular contas
garcom.calcularConta(mesa1); // Conta mesa 1 (deve somar o preço de 2 pizzas + 1 espaguete)
garcom.calcularConta(mesa2); // Conta mesa 2 (deve somar o preço de 3 saladas)
// Atualizar status das mesas
garcom.atualizarMesa(mesa1, true); // Mesa 1 está disponível
garcom.atualizarMesa(mesa2, true); // Mesa 2 está disponível
