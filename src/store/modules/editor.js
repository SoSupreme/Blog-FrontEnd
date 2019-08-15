import { createAction, handleActions } from 'redux-actions';

import * as api from '../../lib/api.js';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

// action types
const INITIALIZE = 'editor/INITIALIZE';
const CHANGE_INPUT = 'editor/CHANGE_INPUT';
const WRITE_POST = 'editor/WRITE_POST';
const GET_POST = 'editor/GET_POST';
const EDIT_POST = 'editor/EDIT_POST';

// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const writePost = createAction(WRITE_POST,api.writePost);
export const getPost = createAction(GET_POST, api.getPost);
export const editPost = createAction(EDIT_POST,api.editPost);   // handleAction X -> 어떤 포스트를 수정하는지 알고 있음으로

// initial state
const initialState = Map({
    title: '',
    markdown: '',
    tags: '',
    postId: null
});

// reducer
export default handleActions({
    [INITIALIZE]: (state,action) => initialState,
    [CHANGE_INPUT]: (state,action) => {
        const { name,value } = action.payload;
        return state.set(name,value);
    },
    ...pender({                     // WRITE_POST api 호출 성공해서 postId를 받으면 state의 postID 를 교체
        type: WRITE_POST,
        onSuccess: (state,action) => {
            const{ _id } = action.payload.data;
            return state.set('postId',_id);
        }
    }),
    ...pender({
        type: GET_POST,
        onSuccess: (state,action) => {
            const { title, tags ,body } = action.payload.data;
            return state.set('title', title)
            .set('markdown', body)
            .set('tags', tags.join(', '));  // 배열을 ,로 이루어진 문자열로 변환
        }
    })
},initialState);