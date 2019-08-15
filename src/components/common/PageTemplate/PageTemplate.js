import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';

import HeaderContainer from '../../../containers/common/HeaderContainer.js';
import FooterContainer from '../../../containers/common/FooterContainer.js';

const cx = classNames.bind(styles);

const PageTemplate = ({children}) => (
  <div className={cx('page-template')}>
    <HeaderContainer />
    <main>
      {children}
    </main>
    <FooterContainer />
  </div>
);

export default PageTemplate;