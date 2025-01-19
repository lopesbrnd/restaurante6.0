export class Cliente{
    private _nome:string;
    private _numero:string;

    constructor(nome:string,numero:string){
        this._nome=nome
        this._numero=numero
    }

    get nome():string{
        return this._nome
    }
    get numero():string{
        return this._numero
    }
}