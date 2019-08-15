import React, { Component } from 'react';

import { connect } from 'react-redux';
import PreviewPane from '../../components/editor/PreviewPane';

class PreviewPaneContainer extends Component {
    render() {
        const { markdown, title } = this.props;

        return (
            <PreviewPane title={title} markdown={markdown} />
        );
    }
}

export default connect( // store에서 title,markdown 값을 받아옴 => state로
    (state) => ({
        title: state.editor.get('title'),
        markdown: state.editor.get('markdown')
    })
)(PreviewPaneContainer);