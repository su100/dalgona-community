import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Header from 'components/common/Header';
import FindIdContainer from 'containers/FindIdContainer';

const FindIdPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Header history={history} location={location} isHome={false} />}>
                <FindIdContainer />
            </PageTemplate>
        </div>
    );
};

export default FindIdPage;
