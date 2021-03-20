import React, { Component } from 'react';
import Editor from 'components/common/Editor';
import './Write.scss';

class Write extends Component {
    constructor(props) {
        super(props);
        const isEdit = Object.keys(props.editPost).length > 0;
        this.state = {
            isEdit: isEdit,
            title: isEdit ? props.editPost.title : '',
            categoryId: '',
            isAnonymous: isEdit ? props.editPost.anonymous : false,
            editorState: isEdit ? props.editPost.body : '',
        };
    }

    handleChange = (html) => {
        this.setState({ editorState: html });
    };

    handleForm = (name) => (e) => {
        this.setState({ [name]: e.target.value });
    };

    handleAnonymous = (e) => {
        this.setState({ isAnonymous: e.target.checked });
    };

    isEmpty = (htmlString) => {
        const parser = new DOMParser();
        const { textContent } = parser.parseFromString(htmlString, 'text/html').documentElement;
        return !textContent.trim();
    };

    updatePost = () => {
        const { editPost, updatePost } = this.props;
        const { title, editorState, isAnonymous } = this.state;
        updatePost(editPost.board_url, editPost.id, title, JSON.stringify(editorState, null, 2), isAnonymous);
    };

    addPost = () => {
        const { addPost, isAuthenticated, location } = this.props;
        const boardUrl = location.pathname.split('/')[3];
        const { title, isAnonymous, editorState } = this.state;
        //빈 값 체크
        if (title === '') alert('제목을 입력해주세요.');
        else if (this.isEmpty(editorState)) alert('내용을 입력해주세요.');
        else {
            if (!isAuthenticated) {
                alert('로그인이 필요합니다.');
                this.props.history.push('/login');
            }
            addPost(
                title,
                JSON.stringify(editorState, null, 2),
                boardUrl,
                isAnonymous ? true : false //익명이 참일때 1, 익명이 아닐 때 0
            );
        }
    };

    render() {
        const { previewURL, isEdit, title, isAnonymous, editorState } = this.state;
        const { isAuthenticated, boardInfo, editPost } = this.props;

        return (
            <div className="write">
                <div className="write__top">
                    <span>글쓰기</span>
                </div>
                {previewURL && (
                    <div className="signupinfo__img-preview">
                        <div className="signupinfo__img-preview-background" />
                        <img src={previewURL} alt="preview" />
                        <button id={this.type} onClick={this.deleteImg}>
                            X
                        </button>
                    </div>
                )}
                <Editor
                    boardTitle={boardInfo.board_name}
                    title={title}
                    contents={editorState}
                    isAnonymous={isAnonymous}
                    QuillChange={this.handleChange}
                    addPostImage={this.props.addPostImage}
                    handleForm={this.handleForm('title')}
                    handleAnonymous={this.handleAnonymous}
                    boardUrl={this.props.location.pathname.split('/')}
                    isAuthenticated={isAuthenticated}
                />
                <div className="write__btn">
                    <button onClick={this.props.history.goBack} className="write__btn-cancel">
                        취소
                    </button>
                    <button onClick={isEdit ? this.updatePost : this.addPost} className="write__btn-confirm">
                        {isEdit ? '수정' : '등록'}
                    </button>
                </div>
            </div>
        );
    }
}

export default Write;
