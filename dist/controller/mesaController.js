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
export function atualizarDisponibilidadeMesa(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const mesaId = parseInt(req.params.mesaId);
        const { disponibilidade } = req.body;
        if (isNaN(mesaId) || typeof disponibilidade !== 'number') {
            res.status(400).json({ message: 'Parâmetros inválidos.' });
            return;
        }
        try {
            const sucesso = yield mesaModel.atualizarDisponibilidadeMesa(mesaId, disponibilidade);
            if (sucesso) {
                res.status(200).json({ message: 'Mesa atualizada com sucesso.' });
            }
            else {
                res.status(404).json({ message: 'Mesa não encontrada.' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar a mesa.', error });
        }
    });
}
