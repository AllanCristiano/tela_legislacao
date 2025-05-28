import { Document } from '@/types';
import { mockDocuments } from '@/data/mockDocuments';
import FilterPanel from '@/components/FilterPanel';
import SearchBar from '@/components/SearchBar';
import DocumentList from '@/components/DocumentList';
import DocumentStats from '@/components/DocumentStats';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6">
        {/* Stats Dashboard */}
        <DocumentStats 
          allDocuments={mockDocuments}
          filteredDocuments={mockDocuments}
          isFiltered={false}
        />
        
        {/* Search */}
        <SearchBar />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Filters */}
          <div className="md:col-span-1">
            <FilterPanel
              startDate=""
              endDate=""
              selectedCategories={[]}
              onStartDateChange={() => {}}
              onEndDateChange={() => {}}
              onCategoryChange={() => {}}
              onResetFilters={() => {}}
              isMobileOpen={false}
              onToggleMobile={() => {}}
            />
          </div>
          
          {/* Document List */}
          <div className="md:col-span-3">
            <DocumentList 
              documents={mockDocuments}
              isFiltered={false}
            />
          </div>
        </div>
      </main>
    </div>
  );
}