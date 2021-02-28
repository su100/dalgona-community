import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Nav from 'components/common/Nav';
import PointContainer from 'containers/PointContainer';

const PointPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Nav history={history} location={location} isHome={false} />} nofooter={true}>
                <PointContainer />
            </PageTemplate>
        </div>
    );
};

export default PointPage;
