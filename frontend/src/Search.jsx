import React, { useState } from 'react';

import "./Search.css";

const API_BASE_URL = '<base_url>';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const queryParams = new URLSearchParams();
    queryParams.append('query', searchQuery);
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        queryParams.append('filters', `key=${filters[key]}`);
      }
    });

    // Fetch records
    const response = await fetch(`${API_BASE_URL}?${queryParams}`);
    console.log({ response })

  };

  return (
    <div>
    <form onSubmit={handleSubmit} className='searchForm'>
      <div className="search">
      <input type="text" value={searchQuery} onChange={handleSearchChange} />
      <button type="submit">Search</button>
      </div>
      <div className="filters">
        <label>Filters:</label>
      <select value={""} onChange={handleFilterChange}>
          <option value="">Select a SKU</option>
          <option value="filter1">SKU 1</option>
          <option value="filter2">SKU 2</option>
        </select>
        <select value={""} onChange={handleFilterChange}>
          <option value="">Select a Product</option>
          <option value="filter1">Product 1</option>
          <option value="filter2">Product 2</option>
        </select>
      </div>
    </form>
    </div>
  );
};

export default Search;
