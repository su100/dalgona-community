import React from 'react';

import searchIcon from 'images/searchIcon.png';
import './SearchInput.scss';

const SearchInput = ({ searchWord, handleChange, placeholder, getSearch }) => {
    const handleKeyPress = (e) => {
        //Enter 누르면 검색
        if (e.key === 'Enter') {
            getSearch();
        }
    };
    return (
        <div className="search-input">
            <input
                type="search"
                name="q"
                placeholder={placeholder}
                id="searchWord"
                value={searchWord}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
            <button onClick={getSearch}>
                <img src={searchIcon} alt="search" />
            </button>
        </div>
    );
};

export default SearchInput;
