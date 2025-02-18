export class Mesa {
    constructor(nome, numero) {
        this._disponibilidade = true;
        ;
        this._nome = nome;
        this._numero = numero;
    }
    atualizarDisponibilidade(status) {
        this._disponibilidade = status;
    }
    realizarPedido(pedido) {
        this._pedido = pedido;
        this.atualizarDisponibilidade(false); // Mesa não está disponível após o pedido
    }
    calcularConta() {
        if (this._pedido) {
            return this._pedido.calcularTotal();
        }
        return 0;
    }
    get numero() {
        return this._numero;
    }
    get disponibilidade() {
        return this._disponibilidade;
    }
    get nome() {
        return this._nome;
    }
    get pedido() {
        return this._pedido;
    }
}
