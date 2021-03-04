import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import LunaPostContainer from 'containers/LunaPostContainer';

const LunaPostPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<NavContainer history={history} location={location} isHome={true} />}>
                <LunaPostContainer history={history} />
            </PageTemplate>
        </div>
    );
};

export default LunaPostPage;
