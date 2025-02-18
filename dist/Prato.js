export class Prato {
    constructor(nome, preco, descricao, quantidade = 1) {
        this._nome = nome;
        this._preco = preco;
        this._descricao = descricao;
        this._quantidade = quantidade;
    }
    adicionar_quantidade(n) {
        this._quantidade = n;
        return;
    }
    get nome() {
        return this._nome;
    }
    get preco() {
        return this._preco;
    }
    get descricao() {
        return this._descricao;
    }
    get quantidade() {
        return this._quantidade;
    }
}
