import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Nav from 'components/common/Nav';
import NoticePostContainer from 'containers/NoticePostContainer';

const NoticePostPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Nav history={history} location={location} isHome={true} />}>
                <NoticePostContainer />
            </PageTemplate>
        </div>
    );
};

export default NoticePostPage;
