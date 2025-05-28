import { Pool } from 'pg';
import { mockDocuments } from '../data/mockDocuments';

const pool = new Pool({
  connectionString: 'postgresql://teste_9f9e_user:FailiEd1RMtIdeSyCKXFUHFC6C685tiq@dpg-d0rjg0bipnbc73ba3tgg-a.oregon-postgres.render.com/teste_9f9e',
  ssl: {
    rejectUnauthorized: false
  }
});

async function createTable() {
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
      );
    `);
    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
    throw error;
  }
}

async function seedDatabase() {
  try {
    await createTable();

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
          doc.content,
          doc.fileUrl,
        ]
      );
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await pool.end();
  }
}

seedDatabase();