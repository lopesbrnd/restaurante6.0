import { Prato } from '../src/Prato'; 

describe('Prato', () => {
  // Teste de inicialização (constructor)
  describe('constructor', () => {
    it('deve criar uma instância de Prato com os valores corretos e quantidade padrão', () => {
      const prato = new Prato('Pizza', 25.5, 'Pizza de calabresa');
      
      expect(prato).toBeInstanceOf(Prato);
      expect(prato.nome).toBe('Pizza');
      expect(prato.preco).toBe(25.5);
      expect(prato.descricao).toBe('Pizza de calabresa');
      expect(prato.quantidade).toBe(1); // Valor padrão quando não informado
    });

    it('deve criar uma instância de Prato com quantidade informada', () => {
      const prato = new Prato('Hamburger', 15.0, 'Hamburger artesanal', 3);
      
      expect(prato.quantidade).toBe(3);
    });
  });

  // Teste do método adicionar_quantidade
  describe('adicionar_quantidade', () => {
    it('deve atualizar a quantidade do prato corretamente', () => {
      const prato = new Prato('Salada', 10.0, 'Salada Caesar');
      
      // Verifica o valor padrão da quantidade
      expect(prato.quantidade).toBe(1);
      
      // Atualiza a quantidade e verifica o novo valor
      prato.adicionar_quantidade(4);
      expect(prato.quantidade).toBe(4);
    });
  });

  // Testes dos getters
  describe('getters', () => {
    it('deve retornar os valores corretos através dos getters', () => {
      const prato = new Prato('Pasta', 20.0, 'Massa ao pesto', 2);
      
      expect(prato.nome).toBe('Pasta');
      expect(prato.preco).toBe(20.0);
      expect(prato.descricao).toBe('Massa ao pesto');
      expect(prato.quantidade).toBe(2);
    });
  });

  // Testes de casos especiais
  describe('casos especiais', () => {
    it('deve atualizar a quantidade para zero quando informado zero', () => {
      const prato = new Prato('Risoto', 30.0, 'Risoto de cogumelos', 2);
      
      prato.adicionar_quantidade(0);
      expect(prato.quantidade).toBe(0);
    });
  });
});