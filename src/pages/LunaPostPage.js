import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Header from 'components/common/Header';
import LunaPostContainer from 'containers/LunaPostContainer';

const LunaPostPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Header history={history} location={location} isHome={true} />}>
                <LunaPostContainer />
            </PageTemplate>
        </div>
    );
};

export default LunaPostPage;
