import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import SignUpContainer from 'containers/SignUpContainer';

const SignUpPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate>
                <SignUpContainer />
            </PageTemplate>
        </div>
    );
};

export default SignUpPage;
