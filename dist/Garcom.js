export class Garcom {
    constructor(nome) {
        this._disponibilidade = true;
        this._taxa = 0.05;
        this._nome = nome;
    }
    registrarPedido(mesa, pedido) {
        mesa.realizarPedido(pedido);
        console.log(`Garçom ${this.nome} registrou o pedido para a mesa ${mesa.numero}.`);
    }
    calcularConta(mesa) {
        let total = mesa.calcularConta();
        let total_com_taxa = total * (1 + this._taxa);
        console.log(`Conta total para a mesa ${mesa.numero}: R$ ${total_com_taxa.toFixed(2)}`);
        return total_com_taxa;
    }
    atualizarMesa(mesa, status) {
        mesa.atualizarDisponibilidade(status);
        let statusMesa = status ? 'disponível' : 'indisponível';
        console.log(`Mesa ${mesa.numero} está ${statusMesa}.`);
    }
    get nome() {
        return this._nome;
    }
    get taxa() {
        return this._taxa;
    }
    get disponibilidade() {
        return this._disponibilidade;
    }
}
