import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Header from 'components/common/Header';
import ArticleContainer from 'containers/ArticleContainer';

const ArticlePage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Header history={history} location={location} isHome={true} />}>
                <ArticleContainer />
            </PageTemplate>
        </div>
    );
};

export default ArticlePage;
