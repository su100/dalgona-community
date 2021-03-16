import React from 'react';
import SearchInput from 'components/common/SearchInput';
import './SearchBox.scss';

const SearchBox = ({ searchWord, searchDivision, placeholder, handleChange, getSearch }) => {
    return (
        <div className="search-box">
            <select id="searchDivision" value={searchDivision} onChange={handleChange}>
                <option value="all">루나+자유+달고나</option>
                <option value="luna">루나</option>
                <option value="free">자유</option>
                <option value="dalgona">달고나</option>
            </select>
            <SearchInput
                searchWord={searchWord}
                placeholder={placeholder}
                handleChange={handleChange}
                getSearch={getSearch}
            />
            <h4 className="not-pc">검색</h4>
        </div>
    );
};

export default SearchBox;
