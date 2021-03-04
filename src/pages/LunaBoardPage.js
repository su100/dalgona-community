import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import LunaBoardContainer from 'containers/LunaBoardContainer';

const LunaBoardPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<NavContainer history={history} location={location} isHome={true} />}>
                <LunaBoardContainer />
            </PageTemplate>
        </div>
    );
};

export default LunaBoardPage;
