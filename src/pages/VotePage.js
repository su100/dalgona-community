import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Nav from 'components/common/Nav';
import VoteContainer from 'containers/VoteContainer';

const VotePage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Nav history={history} location={location} isHome={true} />}>
                <VoteContainer />
            </PageTemplate>
        </div>
    );
};

export default VotePage;
