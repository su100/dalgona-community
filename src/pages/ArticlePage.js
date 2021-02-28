import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Nav from 'components/common/Nav';
import ArticleContainer from 'containers/ArticleContainer';

const ArticlePage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Nav history={history} location={location} isHome={true} />}>
                <ArticleContainer />
            </PageTemplate>
        </div>
    );
};

export default ArticlePage;
