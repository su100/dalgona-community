import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NoticeBoardContainer from 'containers/NoticeBoardContainer';

const NoticeBoardPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate>
                <NoticeBoardContainer />
            </PageTemplate>
        </div>
    );
};

export default NoticeBoardPage;
