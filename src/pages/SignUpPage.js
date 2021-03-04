import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import SignUpContainer from 'containers/SignUpContainer';

const SignUpPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate
                header={<NavContainer history={history} location={location} isHome={false} />}
                nofooter={true}
            >
                <SignUpContainer history={history} location={location} />
            </PageTemplate>
        </div>
    );
};

export default SignUpPage;
