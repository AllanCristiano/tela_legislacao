import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Calendar, Download } from 'lucide-react';
import { Document } from '../types';
import { formatDate } from '../utils/dateUtils';
import { getCategoryName, getCategoryColor } from '../utils/documentUtils';

interface DocumentCardProps {
  document: Document;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  const [expanded, setExpanded] = useState(false);
  const categoryColor = getCategoryColor(document.category);
  
  return (
    <div className={`bg-white rounded-lg shadow-sm border-l-4 ${categoryColor.border} overflow-hidden transition-all duration-200 hover:shadow-md group`}>
      <div className="p-5">
        {/* Header with category badge and date */}
        <div className="flex justify-between items-start mb-3">
          <span className={`inline-flex items-center ${categoryColor.bg} ${categoryColor.text} text-xs font-semibold px-3 py-1.5 rounded-full`}>
            <FileText size={14} className="mr-1.5" />
            {getCategoryName(document.category)}
          </span>
          <div className="flex items-center text-gray-500 text-sm bg-gray-50 px-3 py-1 rounded-full">
            <Calendar size={14} className="mr-1.5" />
            <time dateTime={document.date}>{formatDate(document.date)}</time>
          </div>
        </div>
        
        {/* Document number and title */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-500 mb-1">
            Documento Nº {document.number}
          </p>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
            {document.title}
          </h3>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {document.description}
        </p>
        
        {/* Expand/Collapse button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full"
        >
          {expanded ? (
            <>
              <ChevronUp size={16} className="mr-1.5" />
              Recolher detalhes
            </>
          ) : (
            <>
              <ChevronDown size={16} className="mr-1.5" />
              Ver detalhes
            </>
          )}
        </button>
      </div>
      
      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-5 animate-fadeIn">
          <div className="pt-4 border-t border-gray-100">
            <div className="prose prose-sm max-w-none">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700 leading-relaxed">
                {document.content}
              </div>
            </div>
            
            {document.fileUrl && (
              <a
                href={document.fileUrl}
                className="mt-4 inline-flex items-center text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 px-4 py-2.5 rounded-lg transition-colors"
              >
                <Download size={16} className="mr-2" />
                Baixar documento completo (PDF)
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentCard;