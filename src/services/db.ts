import { Pool } from 'pg';
import { Document } from '../types';
import { mockDocuments } from '../data/mockDocuments';

const pool = new Pool({
  host: 'dpg-d0rjg0bipnbc73ba3tgg-a.oregon-postgres.render.com',
  database: 'teste_9f9e',
  user: 'teste_9f9e_user',
  password: 'FailiEd1RMtIdeSyCKXFUHFC6C685tiq',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

const initializeDatabase = async () => {
  try {
    // Check if we need to seed the database
    const result = await pool.query('SELECT COUNT(*) as count FROM documents');
    if (parseInt(result.rows[0].count) === 0) {
      // Seed with mock data
      for (const doc of mockDocuments) {
        await pool.query(
          `INSERT INTO documents 
            (number, date, title, description, category, content, file_url)
           VALUES 
            ($1, $2, $3, $4, $5, $6, $7)`,
          [
            doc.number,
            doc.date,
            doc.title,
            doc.description,
            doc.category,
            doc.content || null,
            doc.fileUrl || null
          ]
        );
      }
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export const getDocuments = async (): Promise<Document[]> => {
  try {
    await initializeDatabase();
    const result = await pool.query('SELECT * FROM documents ORDER BY date DESC');
    return result.rows.map(row => ({
      ...row,
      id: row.id.toString(),
      fileUrl: row.file_url
    }));
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
}): Promise<Document> => {
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
        document.content || null,
        document.file_url || null
      ]
    );

    const row = result.rows[0];
    return {
      ...row,
      id: row.id.toString(),
      fileUrl: row.file_url
    };
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};