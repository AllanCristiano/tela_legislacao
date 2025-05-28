import { Document } from '../types';
import { mockDocuments } from '../data/mockDocuments';

export const getDocuments = async (): Promise<Document[]> => {
  return Promise.resolve(mockDocuments);
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
  const newDocument: Document = {
    id: `doc-${Date.now()}`,
    number: document.number,
    date: document.date,
    title: document.title,
    description: document.description,
    category: document.category as Document['category'],
    content: document.content,
    fileUrl: document.file_url
  };
  
  mockDocuments.unshift(newDocument);
  return Promise.resolve(newDocument);
};