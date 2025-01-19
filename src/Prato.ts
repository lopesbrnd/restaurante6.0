export class Prato{
    private _quantidade:number
    private _nome:string
    private _preco:number
    private _descricao:string

    constructor(nome: string, preco: number,descricao:string,quantidade:number=1) {
        this._nome = nome;
        this._preco = preco;
        this._descricao=descricao
        this._quantidade=quantidade
    }

    adicionar_quantidade(n:number){
        this._quantidade= n
        return;
    }

    get nome():string{
        return this._nome
    }

    get preco():number{
        return this._preco
    }

    get descricao ():string{
        return this._descricao
    }

    get quantidade():number{
        return this._quantidade
    }
}