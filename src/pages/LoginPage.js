import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Header from 'components/common/Header';
import LoginContainer from 'containers/LoginContainer';

const LoginPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Header history={history} location={location} isHome={false} />}>
                <LoginContainer />
            </PageTemplate>
        </div>
    );
};

export default LoginPage;
