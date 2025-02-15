import { Mesa } from '../src/Mesa'; 
import { Pedido } from '../src/Pedido'; 

describe('Mesa', () => {
  // Teste de inicialização (constructor)
  describe('constructor', () => {
    it('deve criar uma instância de Mesa com os valores corretos', () => {
      const mesa = new Mesa('Mesa A', 1);
      
      expect(mesa).toBeInstanceOf(Mesa);
      expect(mesa.nome).toBe('Mesa A');
      expect(mesa.numero).toBe(1);
      expect(mesa.disponibilidade).toBe(true);
    });
  });

  // Testes dos métodos
  describe('métodos', () => {
    let mesa: Mesa;
    let pedidoMock: Pedido;
    
    beforeEach(() => {
      mesa = new Mesa('Mesa A', 1);
      // Criamos um mock simples para Pedido
      pedidoMock = {
        calcularTotal: jest.fn().mockReturnValue(50)
      } as unknown as Pedido;
    });

    it('deve atualizar a disponibilidade da mesa', () => {
      // Verifica a disponibilidade inicial
      expect(mesa.disponibilidade).toBe(true);
      
      // Atualiza para indisponível e verifica
      mesa.atualizarDisponibilidade(false);
      expect(mesa.disponibilidade).toBe(false);
      
      // Atualiza para disponível novamente e verifica
      mesa.atualizarDisponibilidade(true);
      expect(mesa.disponibilidade).toBe(true);
    });

    it('deve realizar um pedido e atualizar a disponibilidade para false', () => {
      mesa.realizarPedido(pedidoMock);
      
      // Verifica se o pedido foi atribuído e se a mesa se tornou indisponível
      expect(mesa.pedido).toBe(pedidoMock);
      expect(mesa.disponibilidade).toBe(false);
    });

    it('deve calcular a conta corretamente quando houver um pedido', () => {
      mesa.realizarPedido(pedidoMock);
      const total = mesa.calcularConta();
      
      // Verifica se o método calcularTotal foi chamado e se o total é o esperado
      expect(pedidoMock.calcularTotal).toHaveBeenCalled();
      expect(total).toBe(50);
    });

    it('deve retornar zero ao calcular a conta se nenhum pedido foi realizado', () => {
      const total = mesa.calcularConta();
      expect(total).toBe(0);
    });
  });

  // Testes dos getters
  describe('getters', () => {
    it('deve retornar o nome, número e disponibilidade corretamente', () => {
      const mesa = new Mesa('Mesa B', 2);
      expect(mesa.nome).toBe('Mesa B');
      expect(mesa.numero).toBe(2);
      expect(mesa.disponibilidade).toBe(true);
    });

    it('deve retornar o pedido corretamente após realizar um pedido', () => {
      const mesa = new Mesa('Mesa C', 3);
      
      // Inicialmente, nenhum pedido foi realizado
      expect(mesa.pedido).toBeUndefined();
      
      const pedidoMock = {
        calcularTotal: jest.fn().mockReturnValue(100)
      } as unknown as Pedido;
      
      mesa.realizarPedido(pedidoMock);
      expect(mesa.pedido).toBe(pedidoMock);
    });
  });
});