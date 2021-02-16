import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Header from 'components/common/Header';
import VoteListContainer from 'containers/VoteListContainer';

const VoteListPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Header history={history} location={location} isHome={true} />}>
                <VoteListContainer />
            </PageTemplate>
        </div>
    );
};

export default VoteListPage;
