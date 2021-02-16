import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Header from 'components/common/Header';
import FreeBoardContainer from 'containers/FreeBoardContainer';

const FreeBoardPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Header history={history} location={location} isHome={true} />}>
                <FreeBoardContainer />
            </PageTemplate>
        </div>
    );
};

export default FreeBoardPage;
