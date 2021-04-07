import React from 'react';
import SearchInput from 'components/common/SearchInput';
import StarIcon from 'images/star.png';
import StarFilledIcon from 'images/star_filled.png';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = ({
  boardType,
  boardUrl,
  title,
  hasWrite,
  hasBookmark,
  isBookmarked,
  updateBookmark,
  placeholder,
  searchWord,
  getSearch,
  handleChange,
}) => (
  <div className="header">
    <div className="header__row">
      <div className="header__title">
        <h4>{title}</h4>
        {hasBookmark && (
          <button onClick={updateBookmark}>
            <img src={isBookmarked ? StarFilledIcon : StarIcon} alt="bookmark" />
          </button>
        )}
      </div>
      {hasWrite && (
        <button className="header__btn--write">
          <Link to={boardUrl ? `/${boardType}/${boardUrl}/write` : `/${boardType}/write`}>글쓰기</Link>
        </button>
      )}
    </div>
    <hr className="not-pc" />
    <div className="header__row">
      <SearchInput
        placeholder={placeholder}
        searchWord={searchWord}
        handleChange={handleChange}
        getSearch={getSearch}
      />
    </div>
  </div>
);

export default Header;
