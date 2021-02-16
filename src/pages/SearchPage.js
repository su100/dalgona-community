import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Header from 'components/common/Header';
import SearchContainer from 'containers/SearchContainer';

const SearchPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Header history={history} location={location} isHome={true} />}>
                <SearchContainer />
            </PageTemplate>
        </div>
    );
};

export default SearchPage;
