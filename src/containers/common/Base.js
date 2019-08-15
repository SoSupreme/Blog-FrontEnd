import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginModalContainer from '../../containers/modal/LoginModalContainer.js';
import * as baseActions from '../../store/modules/base.js';

class Base extends Component {
    initialize = async () => {
        // 로그인 상태 확인
        const { BaseActions } = this.props;
        if(localStorage.logged === "true"){
            BaseActions.tempLogin();
        }
        BaseActions.checkLogin();
    }

    componentDidMount() {
        this.initialize();
    }

    render() {
        return (
            <div>
                <LoginModalContainer />
                {/*
                    전역 사용 component 여기서 렌더링
                */}
            </div>
        );
    }
}

export default connect(
    null,
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(Base);