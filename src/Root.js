import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import configure from 'store/configure';
import { BrowserRouter, Route, useLocation, withRouter } from 'react-router-dom';

import App from 'components/App';

const store = configure();

function scrollToTop(props) {
  const { key } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [key]);
  return props.children;
}
const ScrollToTop = withRouter(scrollToTop);

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <Route path="/" component={App} />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>
);
export default Root;
