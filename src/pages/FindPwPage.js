import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import FindPwContainer from 'containers/FindPwContainer';

const FindPwPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<NavContainer history={history} location={location} isHome={false} />}>
                <FindPwContainer history={history} />
            </PageTemplate>
        </div>
    );
};

export default FindPwPage;
