import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import SearchContainer from 'containers/SearchContainer';

const SearchPage = ({ history, location }) => (
  <div>
    <PageTemplate header={<NavContainer history={history} location={location} isHome />}>
      <SearchContainer history={history} location={location} />
    </PageTemplate>
  </div>
);

export default SearchPage;
