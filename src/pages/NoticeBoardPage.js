import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import NoticeBoardContainer from 'containers/NoticeBoardContainer';

const NoticeBoardPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<NavContainer history={history} location={location} isHome={true} />}>
                <NoticeBoardContainer />
            </PageTemplate>
        </div>
    );
};

export default NoticeBoardPage;
