import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Nav from 'components/common/Nav';
import VoteContainer from 'containers/VoteContainer';

const VotePage = ({ history, location, match }) => {
    return (
        <div>
            <PageTemplate header={<Nav history={history} location={location} isHome={true} />}>
                <VoteContainer history={history} location={location} match={match} />
            </PageTemplate>
        </div>
    );
};

export default VotePage;
