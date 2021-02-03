import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ArticleContainer from 'containers/ArticleContainer';

const ArticlePage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate>
                <ArticleContainer />
            </PageTemplate>
        </div>
    );
};

export default ArticlePage;
