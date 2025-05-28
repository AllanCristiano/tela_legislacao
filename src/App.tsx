import { useState, useEffect } from 'react';
import { mockDocuments } from './data/mockDocuments';
import { Document, DocumentCategory } from './types';
import { filterDocuments } from './utils/documentUtils';

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
  const [allDocuments] = useState<Document[]>(mockDocuments);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(mockDocuments);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6">
        {/* 
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Portal de Legislação
        </h1>
        */}
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

export default App;