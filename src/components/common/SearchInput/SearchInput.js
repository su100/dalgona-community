import React from 'react';

import searchIcon from 'images/searchIcon.png';
import './SearchInput.scss';

const SearchInput = ({ searchWord, handleChange, placeholder, getSearch }) => {
    return (
        <div className="search-input">
            <input
                type="search"
                name="q"
                placeholder={placeholder}
                id="searchWord"
                value={searchWord}
                onChange={handleChange}
            />
            <button onClick={getSearch}>
                <img src={searchIcon} alt="search" />
            </button>
        </div>
    );
};

export default SearchInput;
