import { createClient } from '@libsql/client';
import { Document } from '../types';
import { mockDocuments } from '../data/mockDocuments';

const client = createClient({
  url: 'file:local.db',
});

const initializeDatabase = async () => {
  try {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS documents (
        id TEXT PRIMARY KEY,
        number TEXT NOT NULL,
        date TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL CHECK (category IN ('portaria', 'decreto', 'lei-ordinaria', 'lei-complementar')),
        content TEXT,
        file_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Check if we need to seed the database
    const count = await client.execute('SELECT COUNT(*) as count FROM documents');
    if (count.rows[0].count === 0) {
      // Seed with mock data
      for (const doc of mockDocuments) {
        await client.execute({
          sql: `
            INSERT INTO documents (id, number, date, title, description, category, content, file_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `,
          args: [
            doc.id,
            doc.number,
            doc.date,
            doc.title,
            doc.description,
            doc.category,
            doc.content || null,
            doc.fileUrl || null
          ]
        });
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
    const result = await client.execute('SELECT * FROM documents ORDER BY date DESC');
    return result.rows as Document[];
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
    const id = `doc-${Date.now()}`;
    await client.execute({
      sql: `
        INSERT INTO documents (id, number, date, title, description, category, content, file_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        id,
        document.number,
        document.date,
        document.title,
        document.description,
        document.category,
        document.content || null,
        document.file_url || null
      ]
    });

    const result = await client.execute({
      sql: 'SELECT * FROM documents WHERE id = ?',
      args: [id]
    });

    return result.rows[0] as Document;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};