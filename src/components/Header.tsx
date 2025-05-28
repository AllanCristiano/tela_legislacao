import React from 'react';
import { FileText } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <FileText size={28} className="mr-2" />
          <h1 className="text-2xl font-bold">Portal de Legislação Municipal</h1>
        </div>
        <div className="text-sm flex flex-col sm:flex-row sm:items-center">
          <span className="mb-1 sm:mb-0 sm:mr-4">Prefeitura Municipal</span>
          <span className="bg-blue-700 px-3 py-1 rounded-full text-xs font-medium">
            Portal Oficial
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;