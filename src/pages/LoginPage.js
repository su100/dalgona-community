import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import LoginContainer from 'containers/LoginContainer';

const LoginPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate>
                <LoginContainer />
            </PageTemplate>
        </div>
    );
};

export default LoginPage;
