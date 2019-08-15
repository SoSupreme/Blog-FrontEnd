import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';

import EditorHeader from '../../components/editor/EditorHeader';
import * as editorActions from '../../store/modules/editor.js';


class EditorHeaderContainer extends Component {

    componentDidMount() {   // Editor 초기화
        const { EditorActions, location } = this.props;
        EditorActions.initialize();

        const { id } = queryString.parse(location.search);

        if(id){
            EditorActions.getPost(id);
        }
    }

    handleGoBack = () => {  // 뒤로가기
        const { history } = this.props;
        history.goBack();
    }

    handleSubmit = async () => {    // 제출 : axios 사용
        const { title, markdown, tags, EditorActions, history, location } = this.props;
        const post = {
            title,
            body: markdown,
            tags: tags === "" ? [] : [...new Set(tags.split(',').map(tag => tag.trim()))]   // 태그 텍스트를 , 로 분리 + 공백 지우기 + 중복 제거
        };
        
        try {

            const { id } = queryString.parse(location.search);

            if(id){ // id가 존재하면 - editPost 호출
                await EditorActions.editPost({id, ...post});
                history.push(`/post/${id}`);
                return;
            }
            
            await EditorActions.writePost(post);    // 페이지 이동
            history.push(`/post/${this.props.postId}`);  // writePost로 받아온 postId 값을 history에 추가
        } catch(e) {
            console.log(e); // 에러시 출력
        }
    }

    render() {
        const { handleGoBack, handleSubmit } = this;
        const { id } = queryString.parse(this.props.location.search);

        return (
           <EditorHeader
           onGoBack={handleGoBack}
           onSubmit={handleSubmit}
           isEdit={id ? true : false}
           />
        );
    }
}

export default connect(     // store에서 가져옴
    (state) => ({
        title: state.editor.get('title'),
        markdown: state.editor.get('markdown'),
        tags: state.editor.get('tags'),
        postId: state.editor.get('postId')
    }),
    (dispatch) => ({
        EditorActions: bindActionCreators(editorActions,dispatch)
    })
)(withRouter(EditorHeaderContainer));