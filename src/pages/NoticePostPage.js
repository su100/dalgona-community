import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NoticePostContainer from 'containers/NoticePostContainer';

const NoticePostPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate>
                <NoticePostContainer />
            </PageTemplate>
        </div>
    );
};

export default NoticePostPage;
