import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Nav from 'components/common/Nav';
import HomeContainer from 'containers/HomeContainer';

const HomePage = ({ history, location, match }) => {
    return (
        <div>
            <PageTemplate header={<Nav history={history} location={location} match={match} isHome={true} />}>
                <HomeContainer />
            </PageTemplate>
        </div>
    );
};

export default HomePage;
