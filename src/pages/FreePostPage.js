import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import FreePostContainer from 'containers/FreePostContainer';

const FreePostPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<NavContainer history={history} location={location} isHome={true} />}>
                <FreePostContainer />
            </PageTemplate>
        </div>
    );
};

export default FreePostPage;
