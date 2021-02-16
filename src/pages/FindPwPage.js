import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Header from 'components/common/Header';
import FindPwContainer from 'containers/FindPwContainer';

const FindPwPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Header history={history} location={location} isHome={false} />}>
                <FindPwContainer />
            </PageTemplate>
        </div>
    );
};

export default FindPwPage;
