import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import PointContainer from 'containers/PointContainer';

const PointPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate>
                <PointContainer />
            </PageTemplate>
        </div>
    );
};

export default PointPage;
