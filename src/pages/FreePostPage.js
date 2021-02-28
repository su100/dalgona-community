import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Nav from 'components/common/Nav';
import FreePostContainer from 'containers/FreePostContainer';

const FreePostPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Nav history={history} location={location} isHome={true} />}>
                <FreePostContainer />
            </PageTemplate>
        </div>
    );
};

export default FreePostPage;
