import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PostInfo from '../../components/post/PostInfo';
import PostBody from '../../components/post/PostBody';
import * as postActions from '../../store/modules/post.js';

class Post extends Component {

    initialize = async () => {
        const { PostActions, id } = this.props;

        try {
            await PostActions.getPost(id);
        } catch(e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.initialize();
    }

    render() {

        const { loading, post } = this.props;

        if(loading) return null;    // 로딩중엔 아무것도 안나옴

        const { title, body, publishedDate, tags } = post.toJS();

        return (
            <div>
                <PostInfo
                title={title}
                publishedDate={publishedDate}
                tags={tags}
                body={body}
                />
                <PostBody body={body} />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        post: state.post.get('post'),
        loading: state.pender.pending['post/GET_POST']  // 로딩 상태
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions,dispatch)
    })
)(Post)