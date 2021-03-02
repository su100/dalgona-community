import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Nav from 'components/common/Nav';
import VoteBoardContainer from 'containers/VoteBoardContainer';

const VoteBoardPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Nav history={history} location={location} isHome={true} />}>
                <VoteBoardContainer />
            </PageTemplate>
        </div>
    );
};

export default VoteBoardPage;
