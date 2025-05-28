import { useState, useEffect } from 'react';
import { Document, DocumentCategory } from './types';
import { filterDocuments } from './utils/documentUtils';
import { getDocuments } from './services/db';

// Components
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import DocumentList from './components/DocumentList';
import DocumentStats from './components/DocumentStats';

function App() {
  // State for filters
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<DocumentCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  
  // Documents state
  const [allDocuments, setAllDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch documents from database
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const documents = await getDocuments();
        setAllDocuments(documents);
        setFilteredDocuments(documents);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar documentos');
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Apply filters when dependencies change
  useEffect(() => {
    let filtered = filterDocuments(
      allDocuments,
      startDate,
      endDate,
      selectedCategories
    );
    
    // Apply search query if present
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        doc => 
          doc.title.toLowerCase().includes(query) ||
          doc.number.toLowerCase().includes(query) ||
          doc.description.toLowerCase().includes(query) ||
          (doc.content && doc.content.toLowerCase().includes(query))
      );
    }
    
    setFilteredDocuments(filtered);
  }, [allDocuments, startDate, endDate, selectedCategories, searchQuery]);

  // Check if any filter is active
  const isFiltered = Boolean(startDate || endDate || selectedCategories.length > 0 || searchQuery);

  // Reset all filters
  const handleResetFilters = () => {
    setStartDate('');
    setEndDate('');
    setSelectedCategories([]);
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando documentos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6">
        {/* Stats Dashboard */}
        <DocumentStats 
          allDocuments={allDocuments}
          filteredDocuments={filteredDocuments}
          isFiltered={isFiltered}
        />
        
        {/* Search */}
        <SearchBar onSearch={setSearchQuery} />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Filters */}
          <div className="md:col-span-1">
            <FilterPanel
              startDate={startDate}
              endDate={endDate}
              selectedCategories={selectedCategories}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onCategoryChange={setSelectedCategories}
              onResetFilters={handleResetFilters}
              isMobileOpen={isMobileFilterOpen}
              onToggleMobile={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            />
          </div>
          
          {/* Document List */}
          <div className="md:col-span-3">
            <DocumentList 
              documents={filteredDocuments}
              isFiltered={isFiltered}
            />
          </div>
        </div>
      </main>
    </div>
  );
}