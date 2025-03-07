var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from 'dotenv';
import pool from './db.js';
dotenv.config();
// Criação da conexão com o banco de dados
export function getGarcom() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.execute('SELECT * FROM garcom');
            return rows;
        }
        catch (error) {
            console.error('Erro ao obter garcons:', error);
            throw new Error('Erro ao obter dados dos garcons');
        }
    });
}
export function criarGarcom(nome, disponibilidade, taxa) {
    return __awaiter(this, void 0, void 0, function* () {
        // Verifique se algum valor é inválido antes de tentar inserir no banco
        if (!nome || !disponibilidade || !taxa) {
            throw new Error('Campos obrigatórios não preenchidos');
        }
        try {
            const [result] = yield pool.execute('INSERT INTO Garcom (nome, disponibilidade, taxa) VALUES (?, ?)', [nome, disponibilidade, taxa]);
            const insertId = result.insertId;
            return { insertId };
        }
        catch (error) {
            console.error('Erro ao criar garcom:', error);
            throw new Error('Erro ao inserir dados do garcom');
        }
    });
}
