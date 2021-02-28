import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Nav from 'components/common/Nav';
import FindPwContainer from 'containers/FindPwContainer';

const FindPwPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Nav history={history} location={location} isHome={false} />}>
                <FindPwContainer history={history} />
            </PageTemplate>
        </div>
    );
};

export default FindPwPage;
