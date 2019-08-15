import React, { Component } from 'react';
import styles from './EditorPane.scss';
import classNames from 'classnames/bind';

import CodeMirror from 'codemirror';  // codemirror 사용

import 'codemirror/mode/markdown/markdown';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/shell/shell';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

const cx = classNames.bind(styles);

class EditorPane extends Component {

  editor = null;       // Editor ref
  codeMirror = null;   // CodeMirror 인스턴스
  cursor = null;       // Editor 커서 위치

  initializedEditor = () => {
    this.codeMirror = CodeMirror(this.editor, {
      mode: 'markdown',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true
    });
    this.codeMirror.on('change',this.handleChangeMarkdown); // codeMirror 인스턴스가 변화하면 => handleChangeMarkdown 함수 실행
  }

  componentDidMount() {
    this.initializedEditor();
  }

  handleChange = (e) => {
    const{ onChangeInput } = this.props;
    const { name, value } = e.target;
    onChangeInput({name,value});
  }

  handleChangeMarkdown = (doc) => {
    const { onChangeInput } = this.props;
    this.cursor = doc.getCursor(); // 텍스트 커서 위치 저장

    onChangeInput({ 
      name: 'markdown',
      value: doc.getValue()       // 내용을 editor redux에 보냄
    });
  }

  componentDidUpdate(prevProps, prevState) {  // markdown이 변경되면 에디터 값도 변화, 커서위치가 초기화 되기 때문에 커서 위치 설정
    if(prevProps.markdown !== this.props.markdown){
      const { codeMirror, cursor } = this;

      if(!codeMirror) return; // codeMirror 인스턴스 없음

      codeMirror.setValue(this.props.markdown);

      if(!cursor) return;   // 커서가 없다

      codeMirror.setCursor(cursor);
    }
  }

  render() {
    const { handleChange } = this;
    const { tags, title } = this.props;

    return (
      <div className={cx('editor-pane')}>
        <input 
        className={cx('title')}
        placeholder="제목을 입력하세요"
        name="title"
        value={title}
        onChange={handleChange}
        />
        <div className={cx('code-editor')} ref={ref => this.editor = ref }></div>
        <div className={cx('tags')}>
          <div className={cx('description')}>태그</div>
          <input 
          name="tags" 
          placeholder="태그를 입력하세요 (쉼표로 구분)"
          value={tags}
          onChange={handleChange}
          /> 
        </div>
      </div>
    );
  }
}

export default EditorPane;