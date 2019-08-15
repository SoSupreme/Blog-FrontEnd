import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../../components/common/Header';
import * as baseActions from '../../store/modules/base.js';

class HeaderContainer extends Component {

    handleRemove = () => {
        const { BaseActions } = this.props;
        BaseActions.showModal('remove');        // store에 저쟝된 state의 showModal의 payload='remove'를 true로 만듬 => 모달 창이 보임
    }

    render() {
        const { handleRemove } = this;
        const { match, logged } = this.props;
        const { id } = match.params;

        return (
           <Header 
           postId={id}
           logged={logged}
           onRemove={handleRemove}
           />
        );
    }
}

export default connect(
    (state) => ({
        logged : state.base.get('logged')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(withRouter(HeaderContainer));