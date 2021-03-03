import React from 'react';
import SearchInput from 'components/common/SearchInput';
import StarIcon from 'images/star.png';
import StarFilledIcon from 'images/star_filled.png';
import './Header.scss';

const Header = ({ title, hasWrite, isBookmarked }) => {
    return (
        <div className="header">
            <div className="header__row">
                <div className="header__title">
                    <h4>{title}</h4>
                    <button>
                        <img src={isBookmarked ? StarFilledIcon : StarIcon} alt="bookmark" />
                    </button>
                </div>
                {hasWrite && <button className="header__btn--write">글쓰기</button>}
            </div>
            <hr className="not-pc" />
            <div className="header__row">
                <SearchInput />
            </div>
        </div>
    );
};

export default Header;
