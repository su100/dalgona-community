import React from 'react';

import searchIcon from 'images/searchIcon.png';
import searchIcon_gold from 'images/search.png';
import './SearchInput.scss';

const SearchInput = ({ isNavPC, searchWord, handleChange, placeholder, getSearch }) => {
  const handleKeyPress = (e) => {
    // Enter 누르면 검색
    if (e.key === 'Enter') {
      getSearch();
    }
  };
  return (
    <div className={isNavPC ? 'nav-pc search-input' : 'search-input'}>
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
        <img src={isNavPC ? searchIcon_gold : searchIcon} alt="search" />
      </button>
    </div>
  );
};

export default SearchInput;
