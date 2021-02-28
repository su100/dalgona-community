import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Nav from 'components/common/Nav';
import LunaPostContainer from 'containers/LunaPostContainer';

const LunaPostPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Nav history={history} location={location} isHome={true} />}>
                <LunaPostContainer />
            </PageTemplate>
        </div>
    );
};

export default LunaPostPage;
