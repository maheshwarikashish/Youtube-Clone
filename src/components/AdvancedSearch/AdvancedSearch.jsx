import React, { useState, useRef } from 'react';
import './AdvancedSearch.css';

const AdvancedSearch = ({ onSearch, onFiltersChange }) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    duration: 'any',
    uploadDate: 'any',
    quality: 'any',
    category: 'any',
    sortBy: 'relevance',
    language: 'any'
  });
  
  const searchRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query, filters);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      duration: 'any',
      uploadDate: 'any',
      quality: 'any',
      category: 'any',
      sortBy: 'relevance',
      language: 'any'
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const filterOptions = {
    duration: [
      { value: 'any', label: 'Any Duration' },
      { value: 'short', label: 'Under 4 minutes' },
      { value: 'medium', label: '4-20 minutes' },
      { value: 'long', label: '20+ minutes' }
    ],
    uploadDate: [
      { value: 'any', label: 'Any Time' },
      { value: 'hour', label: 'Last Hour' },
      { value: 'today', label: 'Today' },
      { value: 'week', label: 'This Week' },
      { value: 'month', label: 'This Month' },
      { value: 'year', label: 'This Year' }
    ],
    quality: [
      { value: 'any', label: 'Any Quality' },
      { value: '4k', label: '4K' },
      { value: '1080p', label: '1080p' },
      { value: '720p', label: '720p' },
      { value: '480p', label: '480p' }
    ],
    category: [
      { value: 'any', label: 'Any Category' },
      { value: 'music', label: 'Music' },
      { value: 'gaming', label: 'Gaming' },
      { value: 'education', label: 'Education' },
      { value: 'entertainment', label: 'Entertainment' },
      { value: 'technology', label: 'Technology' },
      { value: 'sports', label: 'Sports' },
      { value: 'news', label: 'News' },
      { value: 'movies', label: 'Movies' },
      { value: 'comedy', label: 'Comedy' }
    ],
    sortBy: [
      { value: 'relevance', label: 'Relevance' },
      { value: 'date', label: 'Upload Date' },
      { value: 'views', label: 'View Count' },
      { value: 'rating', label: 'Rating' },
      { value: 'duration', label: 'Duration' }
    ],
    language: [
      { value: 'any', label: 'Any Language' },
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Spanish' },
      { value: 'fr', label: 'French' },
      { value: 'de', label: 'German' },
      { value: 'hi', label: 'Hindi' },
      { value: 'ja', label: 'Japanese' },
      { value: 'ko', label: 'Korean' }
    ]
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== 'any' && value !== 'relevance');

  return (
    <div className="advanced-search">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-container">
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for videos, channels, or playlists..."
            className="search-input"
          />
          <button type="submit" className="search-submit-btn">
            🔍
          </button>
          <button 
            type="button" 
            className={`filters-toggle-btn ${hasActiveFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
            title="Advanced Filters"
          >
            ⚙️
          </button>
        </div>
      </form>

      {showFilters && (
        <div className="filters-panel">
          <div className="filters-header">
            <h4>Advanced Filters</h4>
            <button onClick={clearFilters} className="clear-filters-btn">
              Clear All
            </button>
          </div>
          
          <div className="filters-grid">
            {Object.entries(filterOptions).map(([filterType, options]) => (
              <div key={filterType} className="filter-group">
                <label className="filter-label">
                  {filterType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
                <select
                  value={filters[filterType]}
                  onChange={(e) => handleFilterChange(filterType, e.target.value)}
                  className="filter-select"
                >
                  {options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;