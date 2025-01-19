import { Pedido } from "./Pedido";
export class Mesa {
    private _nome:string
    private _numero:number
    private _disponibilidade: boolean=true;
    private _pedido:Pedido;

    constructor(nome:string,numero:number) {;
        this._nome=nome;
        this._numero=numero
    }

    atualizarDisponibilidade(status: boolean): void {
        this._disponibilidade = status;
    }

    realizarPedido(pedido: Pedido): void {
        this._pedido = pedido;
        this.atualizarDisponibilidade(false); // Mesa não está disponível após o pedido
    }

    calcularConta(): number {
        if (this._pedido) {
            return this._pedido.calcularTotal();
        }
        return 0;
    }

    get numero():number{
        return this._numero
    }
    get disponibilidade ():boolean{
        return this._disponibilidade
    }

    get nome():string{
        return this._nome
    }

    get pedido():Pedido{
        return this._pedido
    }
}