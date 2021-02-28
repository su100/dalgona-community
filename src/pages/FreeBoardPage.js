import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Nav from 'components/common/Nav';
import FreeBoardContainer from 'containers/FreeBoardContainer';

const FreeBoardPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Nav history={history} location={location} isHome={true} />}>
                <FreeBoardContainer />
            </PageTemplate>
        </div>
    );
};

export default FreeBoardPage;
