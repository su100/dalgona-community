import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import HomeContainer from 'containers/HomeContainer';

const HomePage = ({ history, location, match }) => {
    return (
        <div>
            <PageTemplate header={<NavContainer history={history} location={location} match={match} isHome={true} />}>
                <HomeContainer />
            </PageTemplate>
        </div>
    );
};

export default HomePage;
