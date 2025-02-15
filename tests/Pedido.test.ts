import { Pedido } from '../src/Pedido'; 
import { Cliente } from '../src/Cliente'; 
import { Prato } from '../src/Prato';     

describe('Pedido', () => {
  // Teste de inicialização (constructor)
  describe('constructor', () => {
    it('deve criar uma instância de Pedido com o cliente informado e sem pratos', () => {
      const cliente = new Cliente('João Silva', '12345');
      const pedido = new Pedido(cliente);
      
      expect(pedido).toBeInstanceOf(Pedido);
      expect(pedido.cliente).toBe(cliente);
      expect(pedido.pratos).toEqual([]);
    });
  });

  // Testes do método adicionarPrato
  describe('adicionarPrato', () => {
    it('deve adicionar um prato ao pedido', () => {
      const cliente = new Cliente('Maria Oliveira', '54321');
      const pedido = new Pedido(cliente);
      
      // Cria um mock simples para Prato com as propriedades necessárias (preco e quantidade)
      const prato = { preco: 12.5, quantidade: 2 } as Prato;
      pedido.adicionarPrato(prato);
      
      expect(pedido.pratos).toContain(prato);
    });
  });

  // Testes do método calcularTotal
  describe('calcularTotal', () => {
    it('deve retornar 0 quando nenhum prato for adicionado', () => {
      const cliente = new Cliente('Carlos Souza', '67890');
      const pedido = new Pedido(cliente);
      
      expect(pedido.calcularTotal()).toBe(0);
    });

    it('deve calcular corretamente o total com um prato adicionado', () => {
      const cliente = new Cliente('Ana Paula', '112233');
      const pedido = new Pedido(cliente);
      
      const prato = { preco: 15, quantidade: 3 } as Prato;
      pedido.adicionarPrato(prato);
      
      // Total esperado: 15 * 3 = 45
      expect(pedido.calcularTotal()).toBe(45);
    });

    it('deve calcular corretamente o total com múltiplos pratos adicionados', () => {
      const cliente = new Cliente('Pedro Lima', '445566');
      const pedido = new Pedido(cliente);
      
      const prato1 = { preco: 10, quantidade: 1 } as Prato;
      const prato2 = { preco: 20, quantidade: 2 } as Prato;
      
      pedido.adicionarPrato(prato1);
      pedido.adicionarPrato(prato2);
      
      // Total esperado: (10 * 1) + (20 * 2) = 10 + 40 = 50
      expect(pedido.calcularTotal()).toBe(50);
    });
  });

  // Testes dos getters
  describe('getters', () => {
    it('deve retornar o cliente corretamente através do getter', () => {
      const cliente = new Cliente('Mariana Costa', '99887');
      const pedido = new Pedido(cliente);
      
      expect(pedido.cliente).toBe(cliente);
    });

    it('deve retornar os pratos corretamente através do getter', () => {
      const cliente = new Cliente('Lucas Mendes', '77665');
      const pedido = new Pedido(cliente);
      
      // Inicialmente, o array de pratos deve estar vazio
      expect(pedido.pratos).toEqual([]);
      
      const prato = { preco: 30, quantidade: 2 } as Prato;
      pedido.adicionarPrato(prato);
      
      expect(pedido.pratos).toContain(prato);
    });
  });
});