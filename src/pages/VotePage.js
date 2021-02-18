import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Header from 'components/common/Header';
import VoteContainer from 'containers/VoteContainer';

const VotePage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Header history={history} location={location} isHome={true} />}>
                <VoteContainer />
            </PageTemplate>
        </div>
    );
};

export default VotePage;
