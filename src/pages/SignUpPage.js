import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Nav from 'components/common/Nav';
import SignUpContainer from 'containers/SignUpContainer';

const SignUpPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Nav history={history} location={location} isHome={false} />} nofooter={true}>
                <SignUpContainer history={history} location={location} />
            </PageTemplate>
        </div>
    );
};

export default SignUpPage;
