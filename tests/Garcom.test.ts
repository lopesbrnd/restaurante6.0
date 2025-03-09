import { Cliente } from "../src/Cliente";
import { Garcom } from "../src/Garcom";
import { Mesa } from "../src/Mesa";
import { Pedido } from "../src/Pedido";

jest.mock("../src/Mesa");
jest.mock("../src/Pedido");

describe("Garcom", () => {
    let garcom: Garcom;
    let mesaMock: jest.Mocked<Mesa>;
    let pedidoMock: jest.Mocked<Pedido>;

    beforeEach(() => {
        garcom = new Garcom("Carlos");
        
        mesaMock = {
            nome: "Mesa 1",
            numero: 1,
            realizarPedido: jest.fn(),
            calcularConta: jest.fn().mockReturnValue(100),
            atualizarDisponibilidade: jest.fn(),
        } as unknown as jest.Mocked<Mesa>;
    
        pedidoMock = new Pedido(new Cliente("Bernardo", "71999961981")) as jest.Mocked<Pedido>;
    });

    test("deve registrar um pedido", () => {
        mesaMock.realizarPedido = jest.fn();
        garcom.registrarPedido(mesaMock, pedidoMock);
        expect(mesaMock.realizarPedido).toHaveBeenCalledWith(pedidoMock);
    });

    test("deve calcular a conta com taxa", () => {
        mesaMock.calcularConta = jest.fn().mockReturnValue(100);
        const total = garcom.calcularConta(mesaMock);
        expect(total).toBe(105);
    });

    test("deve atualizar a disponibilidade da mesa", () => {
        mesaMock.atualizarDisponibilidade = jest.fn();
        garcom.atualizarMesa(mesaMock, false);
        expect(mesaMock.atualizarDisponibilidade).toHaveBeenCalledWith(false);
    });

    test("deve retornar o nome do garçom", () => {
        expect(garcom.nome).toBe("Carlos");
    });

    test("deve retornar a taxa do garçom", () => {
        expect(garcom.taxa).toBe(0.05);
    });

    test("deve retornar a disponibilidade do garçom", () => {
        expect(garcom.disponibilidade).toBe(true);
    });
    test("deve definir corretamente o status da mesa como disponível ou indisponível", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(); // Captura os logs
           
        garcom.atualizarMesa(mesaMock, true);
        expect(consoleSpy).toHaveBeenCalledWith("Mesa 1 está disponível.");
        
        garcom.atualizarMesa(mesaMock, false);
        expect(consoleSpy).toHaveBeenCalledWith("Mesa 1 está indisponível.");
    
        consoleSpy.mockRestore(); // Restaura o console original
    });
});
