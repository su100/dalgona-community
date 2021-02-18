import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Header from 'components/common/Header';
import FreePostContainer from 'containers/FreePostContainer';

const FreePostPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Header history={history} location={location} isHome={true} />}>
                <FreePostContainer />
            </PageTemplate>
        </div>
    );
};

export default FreePostPage;
