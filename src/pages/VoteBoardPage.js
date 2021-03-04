import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import VoteBoardContainer from 'containers/VoteBoardContainer';

const VoteBoardPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<NavContainer history={history} location={location} isHome={true} />}>
                <VoteBoardContainer />
            </PageTemplate>
        </div>
    );
};

export default VoteBoardPage;
