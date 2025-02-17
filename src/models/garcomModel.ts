
import dotenv from 'dotenv';

dotenv.config();

// Criação da conexão com o banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

export async function getGarcom() {
  try {
    const [rows] = await pool.execute('SELECT * FROM garcom');
    return rows;
  } catch (error) {
    console.error('Erro ao obter garcons:', error);
    throw new Error('Erro ao obter dados dos garcons');
  }
}

  export async function criarGarcom(
    nome:string
    disponibilidade:boolean
    taxa:number

  ) {
    // Verifique se algum valor é inválido antes de tentar inserir no banco
    if (!nome || !disponibilidade || !taxa) {
      throw new Error('Campos obrigatórios não preenchidos');
    }
  
    try {
      const [result] = await pool.execute(
        'INSERT INTO Garcom (nome, disponibilidade, taxa) VALUES (?, ?)',
        [nome, disponibilidade, taxa]
      );
  
      const insertId = (result as ResultSetHeader).insertId;
      return { insertId }; 
    } catch (error) {
      console.error('Erro ao criar garcom:', error);
      throw new Error('Erro ao inserir dados do garcom');
    }
    }
