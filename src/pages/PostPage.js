import React from 'react';

import PageTemplate from '../components/common/PageTemplate';
import Post from '../containers/post/Post.js';
import AskRemoveModalContainer from '../containers/modal/AskRemoveModalContainer.js';

const PostPage = ({ match }) => {
    const { id } = match.params;

    return (
        <PageTemplate>
            <Post id={id} />
            <AskRemoveModalContainer />
        </PageTemplate>
    );
};

export default PostPage;