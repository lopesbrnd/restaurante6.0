var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as mesaModel from '../models/mesaModel.js';
export function getMesa(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mesa = yield mesaModel.getMesa();
            res.json(mesa);
        }
        catch (error) {
            res.status(500).json({ message: 'Erro ao buscar mesas' });
        }
    });
}
export function criarMesa(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nome, numero } = req.body;
        if (!nome || !numero) {
            return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' });
        }
        try {
            const result = yield mesaModel.criarMesa(nome, numero);
            return res.status(201).json({ id: result.insertId });
        }
        catch (error) {
            return res.status(500).json({ message: 'Erro ao criar mesa' });
        }
    });
}
