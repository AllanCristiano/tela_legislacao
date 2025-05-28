import { createClient } from 'npm:@supabase/supabase-js@2.39.3'
import { Pool } from 'npm:pg@8.11.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

const pool = new Pool({
  connectionString: Deno.env.get('SUPABASE_DB_URL'),
  ssl: {
    rejectUnauthorized: false
  }
})

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (req.method === 'GET') {
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
      `)

      return new Response(
        JSON.stringify(result.rows),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        },
      )
    }

    if (req.method === 'POST') {
      const { number, date, title, description, category, content, file_url } = await req.json()
      
      const result = await pool.query(
        `INSERT INTO documents 
          (number, date, title, description, category, content, file_url)
         VALUES 
          ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [number, date, title, description, category, content, file_url]
      )

      return new Response(
        JSON.stringify(result.rows[0]),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        },
      )
    }

    return new Response('Method not allowed', {
      status: 405,
      headers: corsHeaders,
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    })
  }
})