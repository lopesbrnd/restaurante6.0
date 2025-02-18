export class Cliente {
    constructor(nome, numero) {
        this._nome = nome;
        this._numero = numero;
    }
    get nome() {
        return this._nome;
    }
    get numero() {
        return this._numero;
    }
}
