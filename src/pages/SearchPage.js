import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import SearchContainer from 'containers/SearchContainer';

const SearchPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate>
                <SearchContainer />
            </PageTemplate>
        </div>
    );
};

export default SearchPage;
