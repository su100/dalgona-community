import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Header from 'components/common/Header';
import LunaBoardContainer from 'containers/LunaBoardContainer';

const LunaBoardPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Header history={history} location={location} isHome={true} />}>
                <LunaBoardContainer />
            </PageTemplate>
        </div>
    );
};

export default LunaBoardPage;
