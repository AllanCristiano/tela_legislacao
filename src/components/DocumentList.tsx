import React from 'react';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Document } from '../types';
import DocumentCard from './DocumentCard';

interface DocumentListProps {
  documents: Document[];
  isFiltered: boolean;
}

const ITEMS_PER_PAGE = 5;

const DocumentList: React.FC<DocumentListProps> = ({ documents, isFiltered }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  
  // Calculate pagination
  const totalPages = Math.ceil(documents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDocuments = documents.slice(startIndex, endIndex);
  
  // Page navigation
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  if (documents.length === 0) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start">
        <AlertCircle size={20} className="text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-amber-800">Nenhum documento encontrado</h3>
          <p className="text-sm text-amber-700 mt-1">
            {isFiltered 
              ? 'Não foram encontrados documentos correspondentes aos filtros selecionados. Tente modificar os critérios de busca.'
              : 'Não há documentos disponíveis no sistema. Novos documentos serão adicionados em breve.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4 mb-6">
        {currentDocuments.map((doc) => (
          <DocumentCard key={doc.id} document={doc} />
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg">
          <div className="flex flex-1 items-center justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">{startIndex + 1}</span> até{' '}
                <span className="font-medium">{Math.min(endIndex, documents.length)}</span> de{' '}
                <span className="font-medium">{documents.length}</span> documentos
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Anterior
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold rounded-md ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próximo
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentList;