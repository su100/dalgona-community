import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Header from 'components/common/Header';
import NoticePostContainer from 'containers/NoticePostContainer';

const NoticePostPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Header history={history} location={location} isHome={true} />}>
                <NoticePostContainer />
            </PageTemplate>
        </div>
    );
};

export default NoticePostPage;
