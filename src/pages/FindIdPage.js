import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Nav from 'components/common/Nav';
import FindIdContainer from 'containers/FindIdContainer';

const FindIdPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Nav history={history} location={location} isHome={false} />}>
                <FindIdContainer history={history} />
            </PageTemplate>
        </div>
    );
};

export default FindIdPage;
