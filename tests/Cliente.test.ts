import { Cliente } from '../src/Cliente'; // Ajuste o caminho conforme necessário

describe('Cliente', () => {
  // Teste de inicialização
  describe('constructor', () => {
    it('deve criar uma instância de Cliente com nome e número corretos', () => {
      const cliente = new Cliente('João Silva', '12345');

      expect(cliente).toBeInstanceOf(Cliente);
      expect(cliente.nome).toBe('João Silva');
      expect(cliente.numero).toBe('12345');
    });

    it('deve permitir criação com valores vazios', () => {
      const cliente = new Cliente('', '');

      expect(cliente.nome).toBe('');
      expect(cliente.numero).toBe('');
    });
  });

  // Testes dos getters
  describe('getters', () => {
    it('deve retornar o nome corretamente', () => {
      const cliente = new Cliente('Maria Oliveira', '54321');
      expect(cliente.nome).toBe('Maria Oliveira');
    });

    it('deve retornar o número corretamente', () => {
      const cliente = new Cliente('Carlos Souza', '67890');
      expect(cliente.numero).toBe('67890');
    });
  });

  // Teste de casos especiais
  describe('casos especiais', () => {
    it('deve aceitar caracteres especiais no nome', () => {
      const cliente = new Cliente('Thomas Müller', '111');
      expect(cliente.nome).toBe('Thomas Müller');
    });

    it('deve aceitar números no campo nome', () => {
      const cliente = new Cliente('Cliente 123', '222');
      expect(cliente.nome).toBe('Cliente 123');
    });
  });
});
