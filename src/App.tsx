import { Pool } from 'pg';
import { Document } from '../types';

// Configuração do banco de dados
const pool = new Pool({
  user: 'meu_usuario',
  host: 'localhost',
  database: 'meu_banco',
  password: 'minha_senha',
  port: 5432,
});

// Função para inserir documentos no banco
const insertDocuments = async (documents: Document[]) => {
  const client = await pool.connect();
  try {
    for (const doc of documents) {
      await client.query(
        `INSERT INTO documents (number, date, title, description, category, content, fileUrl) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [doc.number, doc.date, doc.title, doc.description, doc.category, doc.content, doc.fileUrl]
      );
    }
    console.log('Documentos inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir documentos:', error);
  } finally {
    client.release();
  }
};

// Função para recuperar todos os documentos
const getDocuments = async (): Promise<Document[]> => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM documents ORDER BY date DESC');
    return result.rows;
  } catch (error) {
    console.error('Erro ao recuperar documentos:', error);
    return [];
  } finally {
    client.release();
  }
};

// Gera documentos e insere no banco
const documents = generateMockDocuments();
insertDocuments(documents);

export { getDocuments };
