import { Document } from '../types';

// Generate sample data
const generateMockDocuments = (): Document[] => {
  const documents: Document[] = [];
  const categories: Array<Document['category']> = [
    'portaria',
    'decreto',
    'lei-ordinaria',
    'lei-complementar'
  ];
  
  const generateTitle = (category: Document['category'], number: string): string => {
    switch (category) {
      case 'portaria':
        return `Portaria ${number} que dispõe sobre procedimentos administrativos municipais`;
      case 'decreto':
        return `Decreto ${number} que regulamenta a Lei Municipal sobre o comércio local`;
      case 'lei-ordinaria':
        return `Lei Ordinária ${number} que estabelece diretrizes para o transporte público municipal`;
      case 'lei-complementar':
        return `Lei Complementar ${number} que atualiza o código tributário municipal`;
    }
  };

  // Create 50 sample documents
  for (let i = 1; i <= 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const year = 2020 + Math.floor(Math.random() * 5); // 2020-2024
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    const number = `${Math.floor(Math.random() * 1000) + 1}/${year}`;
    
    documents.push({
      id: `doc-${i}`,
      number,
      date: `${year}-${month}-${day}`,
      title: generateTitle(category, number),
      description: `Este documento estabelece normas e procedimentos relativos à ${
        category === 'portaria' ? 'administração municipal' :
        category === 'decreto' ? 'regulamentação de leis' :
        category === 'lei-ordinaria' ? 'legislação ordinária' : 'legislação complementar'
      } do município.`,
      category,
      content: `Conteúdo completo do documento ${category} ${number}. Este é um texto simulado que representa o corpo completo do documento legal. Em um sistema real, este conteúdo seria extraído de um banco de dados ou sistema de gestão documental da prefeitura.`,
      fileUrl: `/documents/${category}-${number.replace('/', '-')}.pdf`
    });
  }
  
  // Sort by date (newest first)
  return documents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const mockDocuments = generateMockDocuments();