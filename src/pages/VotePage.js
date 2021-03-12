import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import VoteContainer from 'containers/VoteContainer';

const VotePage = ({ history, location, match }) => {
    return (
        <div>
            <PageTemplate header={<NavContainer history={history} location={location} isHome={true} />}>
                <VoteContainer history={history} location={location} match={match} />
            </PageTemplate>
        </div>
    );
};

export default VotePage;
