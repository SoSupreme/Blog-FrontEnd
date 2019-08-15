import React, { Component } from 'react';
import styles from './MarkdownRender.scss';
import classNames from 'classnames/bind';

import marked from 'marked';    // markdown을 html로 변환
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
// 지원할 코드 형식들을 불러옵니다
// http://prismjs.com/#languages-list 참조
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-javascript.min.js'
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-css.min.js';

const cx = classNames.bind(styles);

class MarkdownRender extends Component {

  state = {
    html: ''
  };

  renderMarkdown = () => {
    const { markdown } = this.props;

    if(!markdown){  // markdown 없으면 공백
      this.setState({
        html: ' '
      });
      return;
    }
    this.setState({
      html: marked(markdown, {
        breaks: true,   // 일반 엔터로 새 줄 입력
        sanitize: true  // 마크다운 내부 html 무시
      })
    })
  }

  constructor(props){ // 서버사이드 렌더링을 위해 constructor 에서도 구현
    super(props);
    const{ markdown } = props;
   
    this.state = {
      html: markdown ? marked(props.markdown, {breaks: true, sanitize: true}) : ''
    }
  }

  componentDidUpdate (prevProps,prevState) {
    if(prevProps.markdown !== this.props.markdown){   //markdown 값 변경되면 renderMarkdown 호출
      this.renderMarkdown();
    }

    if(prevState.html !== this.state.html){           // state가 바뀌면 코드 하이라이팅
      Prism.highlightAll();
    }
  }

  componentDidMount() {
    Prism.highlightAll();
  }

  render() {
    const { html } = this.state;

    const markup = {  // 리액트에서 html을 렌더링 하기위해 __html 값을 가지는 객체를 생성
      __html: html
    }
    return (
      <div className={cx('markdown-render')} dangerouslySetInnerHTML={markup} />  // dangerouslySetInnerHTML 에 렌더링하려는 html 객체를 넣음
    );
  }
}

export default MarkdownRender;