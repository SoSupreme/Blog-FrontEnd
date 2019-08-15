import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PostList from '../../components/list/PostList';
import Pagination from '../../components/list/Pagination';
import * as listActions from '../../store/modules/list.js';

class ListContainer extends Component {

    getPostList = () => {   // 부모에게서 페이지,태그 값을 받아옴
        const { tag, page, ListActions } = this.props;
        ListActions.getPostList({
            page,
            tag
        });
    }

    componentDidMount() {
        this.getPostList();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.page !== this.props.page || prevProps.tag !== this.props.tag){ // 페이지/태그 가 바뀌면 리스트를 다시 불러옴
            this.getPostList();
            document.documentElement.scrollTop = 0; // 스크롤바 => 화면 가장 위로
        }
    }

    render() {
        const { loading, posts, page, lastPage, tag } = this.props;

        if(loading) return null;    // loading 중에는 null;

        return (
            <div>
                <PostList posts={posts} />
                <Pagination page={page} lastPage={lastPage} tag={tag} />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        lastPage: state.list.get('lastPage'),
        posts: state.list.get('posts'),
        loading : state.pender.pending['list/GET_POST_LIST']
    }),
    (dispatch) => ({
        ListActions: bindActionCreators(listActions, dispatch)
    })
)(ListContainer);