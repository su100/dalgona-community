import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Nav from 'components/common/Nav';
import NoticeBoardContainer from 'containers/NoticeBoardContainer';

const NoticeBoardPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Nav history={history} location={location} isHome={true} />}>
                <NoticeBoardContainer />
            </PageTemplate>
        </div>
    );
};

export default NoticeBoardPage;
