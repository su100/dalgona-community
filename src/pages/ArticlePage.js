import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import ArticleContainer from 'containers/ArticleContainer';

const ArticlePage = ({ history, match, location }) => (
  <div>
    <PageTemplate header={<NavContainer history={history} location={location} isHome />}>
      <ArticleContainer history={history} match={match} location={location} />
    </PageTemplate>
  </div>
);

export default ArticlePage;
