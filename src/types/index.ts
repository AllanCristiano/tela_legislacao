export type DocumentCategory = 'portaria' | 'decreto' | 'lei-ordinaria' | 'lei-complementar';

export interface Document {
  id: string;
  number: string;
  date: string; // ISO format: YYYY-MM-DD
  title: string;
  description: string;
  category: DocumentCategory;
  content?: string; // Full document content when expanded
  fileUrl?: string; // URL to download the full document
}