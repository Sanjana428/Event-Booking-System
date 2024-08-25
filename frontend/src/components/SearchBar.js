// src/components/SearchBar.js
import React, { useState } from 'react';
import {FaSearch} from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    // const [date, setDate] = useState('');

    const handleSearch = () => {
        // console.log("search query",query);
        onSearch(query);
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                className="search-input"
                placeholder="Search by name, location"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <FaSearch className="search-icon" onClick={handleSearch} />
            {/* <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            /> */}
    
        </div>
    );
};

export default SearchBar;
