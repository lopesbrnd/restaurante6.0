export class Pedido {
    constructor(cliente) {
        this._cliente = cliente;
        this._pratos = [];
    }
    adicionarPrato(prato) {
        this._pratos.push(prato);
    }
    calcularTotal() {
        return this._pratos.reduce((total, prato) => total + (prato.preco * prato.quantidade), 0);
    }
    get cliente() {
        return this._cliente;
    }
    get pratos() {
        return this._pratos;
    }
}
