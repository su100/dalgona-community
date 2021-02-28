import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Nav from 'components/common/Nav';
import VoteListContainer from 'containers/VoteListContainer';

const VoteListPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Nav history={history} location={location} isHome={true} />}>
                <VoteListContainer />
            </PageTemplate>
        </div>
    );
};

export default VoteListPage;
