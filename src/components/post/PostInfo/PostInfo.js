import React from 'react';
import styles from './PostInfo.scss';
import classNames from 'classnames/bind';

import { Link } from 'react-router-dom';
import moment from 'moment'; // 날짜 형식 텍스트 출력

const cx = classNames.bind(styles);

const PostInfo = ({ publishedDate, title, tags, body }) => (
  <div className={cx('post-info')}>
    <div className={cx('info')}>
      <h1>{title}</h1>
      <div className={cx('tags')}>
        {
          tags && tags.map( // tags가 존재할 때만 map 실행
            tag => <Link key={tag} to ={`/tag/${tag}`}>#{tag}</Link>
          )
        }
      </div>
      <div className={cx('date')}>{moment(publishedDate).format('ll')}</div>
    </div>
  </div>
);

export default PostInfo;