import { Document } from '../types'

const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/documents`

export const getDocuments = async (): Promise<Document[]> => {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch documents')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching documents:', error)
    throw error
  }
}

export const createDocument = async (document: {
  number: string
  date: string
  title: string
  description: string
  category: string
  content?: string
  file_url?: string
}): Promise<Document> => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(document),
    })
    
    if (!response.ok) {
      throw new Error('Failed to create document')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error creating document:', error)
    throw error
  }
}