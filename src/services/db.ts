import { Pool } from 'pg';
import { Document } from '../types';
import { mockDocuments } from '../data/mockDocuments';

const pool = new Pool({
  connectionString: 'postgresql://teste_9f9e_user:FailiEd1RMtIdeSyCKXFUHFC6C685tiq@dpg-d0rjg0bipnbc73ba3tgg-a.oregon-postgres.render.com/teste_9f9e',
  ssl: {
    rejectUnauthorized: false
  }
});

const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        number text NOT NULL,
        date date NOT NULL,
        title text NOT NULL,
        description text NOT NULL,
        category text NOT NULL CHECK (category IN ('portaria', 'decreto', 'lei-ordinaria', 'lei-complementar')),
        content text,
        file_url text,
        created_at timestamptz DEFAULT now()
      )
    `);

    // Check if we need to seed the database
    const count = await pool.query('SELECT COUNT(*) as count FROM documents');
    if (count.rows[0].count === 0) {
      // Seed with mock data
      for (const doc of mockDocuments) {
        await pool.query(
          `INSERT INTO documents 
            (number, date, title, description, category, content, file_url)
           VALUES 
            ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT DO NOTHING`,
          [
            doc.number,
            doc.date,
            doc.title,
            doc.description,
            doc.category,
            doc.content || null,
            doc.fileUrl || null,
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
}): Promise<Document> => {
  try {
    await initializeDatabase();
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

    return result.rows[0];
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};