import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import LunaBoardContainer from 'containers/LunaBoardContainer';

const LunaBoardPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate>
                <LunaBoardContainer />
            </PageTemplate>
        </div>
    );
};

export default LunaBoardPage;
