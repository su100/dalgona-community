import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Header from 'components/common/Header';
import PointContainer from 'containers/PointContainer';

const PointPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Header history={history} location={location} isHome={false} />} nofooter={true}>
                <PointContainer />
            </PageTemplate>
        </div>
    );
};

export default PointPage;
