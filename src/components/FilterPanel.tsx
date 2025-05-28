import React from 'react';
import { Filter, Calendar, X } from 'lucide-react';
import { DocumentCategory } from '../types';
import { getAllCategories } from '../utils/documentUtils';
import { getYearRange } from '../utils/dateUtils';

interface FilterPanelProps {
  startDate: string;
  endDate: string;
  selectedCategories: DocumentCategory[];
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onCategoryChange: (categories: DocumentCategory[]) => void;
  onResetFilters: () => void;
  isMobileOpen: boolean;
  onToggleMobile: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  startDate,
  endDate,
  selectedCategories,
  onStartDateChange,
  onEndDateChange,
  onCategoryChange,
  onResetFilters,
  isMobileOpen,
  onToggleMobile
}) => {
  const categories = getAllCategories();
  const years = getYearRange(10);
  
  const toggleCategory = (category: DocumentCategory) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden w-full mb-4">
        <button 
          onClick={onToggleMobile}
          className="flex items-center justify-between w-full bg-white p-3 rounded-lg shadow border border-gray-200"
        >
          <div className="flex items-center">
            <Filter size={18} className="mr-2 text-blue-700" />
            <span className="font-medium">Filtros</span>
          </div>
          <div className="flex items-center">
            {(selectedCategories.length > 0 || startDate || endDate) && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full mr-2">
                Ativos
              </span>
            )}
            <span className="text-gray-500">{isMobileOpen ? '−' : '+'}</span>
          </div>
        </button>
      </div>

      {/* Filter Panel */}
      <div className={`${isMobileOpen ? 'block' : 'hidden'} md:block bg-white rounded-lg shadow border border-gray-200 mb-4`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Filter size={18} className="mr-2 text-blue-700" />
              Filtros
            </h2>
            {(selectedCategories.length > 0 || startDate || endDate) && (
              <button 
                onClick={onResetFilters}
                className="text-sm text-red-600 hover:text-red-800 flex items-center"
              >
                <X size={14} className="mr-1" />
                Limpar
              </button>
            )}
          </div>
          
          {/* Date Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Calendar size={16} className="mr-1 text-blue-700" />
              Período
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="start-date" className="block text-xs text-gray-500 mb-1">
                  De
                </label>
                <input
                  type="date"
                  id="start-date"
                  value={startDate}
                  onChange={(e) => onStartDateChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="end-date" className="block text-xs text-gray-500 mb-1">
                  Até
                </label>
                <input
                  type="date"
                  id="end-date"
                  value={endDate}
                  onChange={(e) => onEndDateChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          
          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-medium mb-2">Tipo de Documento</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label 
                  key={category.value} 
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.value)}
                    onChange={() => toggleCategory(category.value)}
                    className="rounded text-blue-700 focus:ring-blue-500 h-4 w-4 mr-2"
                  />
                  <span className="text-sm">{category.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;