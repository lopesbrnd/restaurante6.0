import { Prato } from "./Prato";
import { Cliente } from "./Cliente";
export class Pedido {
    private _cliente: Cliente;
    private _pratos: Prato[];

    constructor(cliente: Cliente) {
        this._cliente = cliente;
        this._pratos = [];
    }

    adicionarPrato(prato: Prato): void {
        this._pratos.push(prato);
    }

    calcularTotal(): number {
        return this._pratos.reduce((total, prato) => total + (prato.preco*prato.quantidade), 0);
    }

    get cliente():Cliente{
        return this._cliente
    }

    get pratos (): Prato[]{
        return this._pratos
    }
}