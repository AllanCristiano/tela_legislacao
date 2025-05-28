import { Document, DocumentCategory } from '../types';

/**
 * Get human-readable category name
 */
export const getCategoryName = (category: DocumentCategory): string => {
  switch (category) {
    case 'portaria':
      return 'Portaria';
    case 'decreto':
      return 'Decreto';
    case 'lei-ordinaria':
      return 'Lei Ordinária';
    case 'lei-complementar':
      return 'Lei Complementar';
  }
};

/**
 * Get category color for UI elements
 */
export const getCategoryColor = (category: DocumentCategory): {
  bg: string;
  text: string;
  border: string;
} => {
  switch (category) {
    case 'portaria':
      return {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-500'
      };
    case 'decreto':
      return {
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-500'
      };
    case 'lei-ordinaria':
      return {
        bg: 'bg-green-50',
        text: 'text-green-700',
        border: 'border-green-500'
      };
    case 'lei-complementar':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-500'
      };
  }
};

/**
 * Get all available categories with labels
 */
export const getAllCategories = (): Array<{value: DocumentCategory, label: string}> => {
  return [
    { value: 'portaria', label: 'Portarias' },
    { value: 'decreto', label: 'Decretos' },
    { value: 'lei-ordinaria', label: 'Leis Ordinárias' },
    { value: 'lei-complementar', label: 'Leis Complementares' }
  ];
};

/**
 * Filter documents by date range and categories
 */
export const filterDocuments = (
  documents: Document[], 
  startDate: string | null, 
  endDate: string | null,
  selectedCategories: DocumentCategory[]
): Document[] => {
  return documents.filter(doc => {
    // Filter by date range
    const docDate = new Date(doc.date);
    const isAfterStart = !startDate || docDate >= new Date(startDate);
    const isBeforeEnd = !endDate || docDate <= new Date(endDate);
    
    // Filter by categories
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(doc.category);
    
    return isAfterStart && isBeforeEnd && matchesCategory;
  });
};