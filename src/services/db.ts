import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://teste_9f9e_user:FailiEd1RMtIdeSyCKXFUHFC6C685tiq@dpg-d0rjg0bipnbc73ba3tgg-a.oregon-postgres.render.com/teste_9f9e',
  ssl: {
    rejectUnauthorized: false
  }
});

export const getDocuments = async () => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        number,
        date,
        title,
        description,
        category,
        content,
        file_url
      FROM documents
      ORDER BY date DESC
    `);
    return result.rows;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

export const createDocument = async (document: {
  number: string;
  date: string;
  title: string;
  description: string;
  category: string;
  content?: string;
  file_url?: string;
}) => {
  try {
    const result = await pool.query(
      `INSERT INTO documents 
        (number, date, title, description, category, content, file_url)
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        document.number,
        document.date,
        document.title,
        document.description,
        document.category,
        document.content,
        document.file_url,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};