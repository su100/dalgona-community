import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Header from 'components/common/Header';
import ArticleListContainer from 'containers/ArticleListContainer';

const ArticleListPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Header history={history} location={location} isHome={true} />}>
                <ArticleListContainer />
            </PageTemplate>
        </div>
    );
};

export default ArticleListPage;
