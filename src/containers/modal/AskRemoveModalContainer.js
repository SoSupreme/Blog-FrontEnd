import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as baseActions from '../../store/modules/base.js';
import * as postActions from '../../store/modules/post.js';
import AskRemoveModal from '../../components/modal/AskRemoveModal';

class AskRemoveModalContainer extends Component {

    handleCancle = () => {
        const { BaseActions } = this.props;
        BaseActions.hideModal('remove');        // hideModal + payload = 'remove'로 호출 => remove를 false로 만듬
    }

    handleConfirm = async () => {
        const { BaseActions, PostActions, history, match } = this.props;
        const { id } = match.params;

        try {
            await PostActions.removePost(id);
            history.push('/');  // 사이트로 이동
            BaseActions.hideModal('remove');   // modal 닫기

        } catch(e) {
            console.log(e);
        }
    }

    render() {
        const { visible } = this.props;
        const { handleCancle, handleConfirm } = this;

        return (
            <AskRemoveModal
            visible={visible}
            onCancle={handleCancle}
            onConfirm={handleConfirm}
            />
        );
    }
}

export default connect (
    (state) => ({
        visible: state.base.getIn(['modal', 'remove'])      // visible 값을 redux에서 받아오기
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(withRouter(AskRemoveModalContainer));