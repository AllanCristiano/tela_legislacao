import React from 'react';
import { FileText, Filter } from 'lucide-react';
import { Document, DocumentCategory } from '../types';
import { getCategoryName } from '../utils/documentUtils';

interface DocumentStatsProps {
  allDocuments: Document[];
  filteredDocuments: Document[];
  isFiltered: boolean;
}

const DocumentStats: React.FC<DocumentStatsProps> = ({ 
  allDocuments, 
  filteredDocuments,
  isFiltered 
}) => {
  // Count documents by category
  const getCategoryCount = (
    docs: Document[], 
    category: DocumentCategory
  ): number => {
    return docs.filter(doc => doc.category === category).length;
  };

  const categories: DocumentCategory[] = [
    'portaria', 
    'decreto', 
    'lei-ordinaria', 
    'lei-complementar'
  ];

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-4 mb-4">
      <div className="flex items-center mb-3">
        <FileText size={18} className="text-blue-700 mr-2" />
        <h2 className="text-lg font-semibold">
          {isFiltered ? 'Documentos Filtrados' : 'Todos os Documentos'}
        </h2>
        {isFiltered && (
          <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Filtro Aplicado
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {categories.map(category => (
          <div key={category} className="bg-gray-50 p-3 rounded border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">{getCategoryName(category)}</p>
            <p className="text-xl font-semibold">
              {getCategoryCount(filteredDocuments, category)}
              {isFiltered && (
                <span className="text-sm text-gray-500 font-normal ml-1">
                  /{getCategoryCount(allDocuments, category)}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-3 text-sm text-gray-600">
        Total: <span className="font-medium">{filteredDocuments.length}</span>
        {isFiltered && (
          <span> de {allDocuments.length} documentos</span>
        )}
      </div>
    </div>
  );
};

export default DocumentStats;