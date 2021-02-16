import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Header from 'components/common/Header';
import HomeContainer from 'containers/HomeContainer';

const HomePage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Header history={history} location={location} isHome={true} />}>
                <HomeContainer />
            </PageTemplate>
        </div>
    );
};

export default HomePage;
