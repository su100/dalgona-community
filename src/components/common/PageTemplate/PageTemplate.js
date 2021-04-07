import React from 'react';
import Footer from 'components/common/Footer';

import './PageTemplate.scss';

const PageTemplate = ({ header, children, nofooter, isLogin }) => (
  <div className="page-template">
    <header>{header}</header>
    <main>{children}</main>
    <footer>
      <Footer nofooter={nofooter} isLogin={isLogin} />
    </footer>
  </div>
);

export default PageTemplate;
