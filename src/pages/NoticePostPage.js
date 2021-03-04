import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import NoticePostContainer from 'containers/NoticePostContainer';

const NoticePostPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<NavContainer history={history} location={location} isHome={true} />}>
                <NoticePostContainer />
            </PageTemplate>
        </div>
    );
};

export default NoticePostPage;
