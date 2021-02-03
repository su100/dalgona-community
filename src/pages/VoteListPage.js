import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import VoteListContainer from 'containers/VoteListContainer';

const VoteListPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate>
                <VoteListContainer />
            </PageTemplate>
        </div>
    );
};

export default VoteListPage;
