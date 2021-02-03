import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import VoteContainer from 'containers/VoteContainer';

const VotePage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate>
                <VoteContainer />
            </PageTemplate>
        </div>
    );
};

export default VotePage;
