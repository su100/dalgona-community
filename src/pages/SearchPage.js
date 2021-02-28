import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Nav from 'components/common/Nav';
import SearchContainer from 'containers/SearchContainer';

const SearchPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Nav history={history} location={location} isHome={true} />}>
                <SearchContainer />
            </PageTemplate>
        </div>
    );
};

export default SearchPage;
