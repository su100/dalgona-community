import React, { useEffect, useState } from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import LoginContainer from 'containers/LoginContainer';

const LoginPage = ({ history, location }) => {
  const [isPc, setIsPc] = useState(false);

  const checkIsPc = () => {
    if (window.innerWidth > 1024) {
      setIsPc(true);
    } else {
      setIsPc(false);
    }
  };

  useEffect(() => {
    checkIsPc();
    window.addEventListener('resize', checkIsPc);
    return () => setIsPc(false);
  }, []);

  return (
    <div>
      <PageTemplate
        header={isPc && <NavContainer history={history} location={location} isHome={false} isLogin />}
        isLogin
      >
        <LoginContainer history={history} location={location} />
      </PageTemplate>
    </div>
  );
};

export default LoginPage;
