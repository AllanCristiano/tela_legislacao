import { Document } from '../types';
import { supabase } from '../lib/supabase';

export const getDocuments = async (): Promise<Document[]> => {
  try {
    const { data, error } = await supabase.functions.invoke('documents', {
      method: 'GET'
    });

    if (error) throw error;
    return data;
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
    const { data, error } = await supabase.functions.invoke('documents', {
      method: 'POST',
      body: document
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};