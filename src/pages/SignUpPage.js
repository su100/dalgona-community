import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Header from 'components/common/Header';
import SignUpContainer from 'containers/SignUpContainer';

const SignUpPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Header history={history} location={location} isHome={false} />} nofooter={true}>
                <SignUpContainer />
            </PageTemplate>
        </div>
    );
};

export default SignUpPage;
