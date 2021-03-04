import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import WriteContainer from 'containers/WriteContainer';

const WritePage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<NavContainer history={history} location={location} isHome={true} />} nofooter={true}>
                <WriteContainer history={history} />
            </PageTemplate>
        </div>
    );
};

export default WritePage;
