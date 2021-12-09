import React, { Component } from 'react';
import Editor from 'components/common/Editor';
import Modal from 'components/common/Modal';
import './Write.scss';

class Write extends Component {
  constructor(props) {
    super(props);
    const isEdit = Object.keys(props.editPost).length > 0;
    this.state = {
      isEdit,
      title: isEdit ? props.editPost.title : '',
      isAnonymous: isEdit ? props.editPost.anonymous : false,
      editorState: '',
      isAlert: false,
      modalMessage: '',
    };
  }

  componentWillUnmount() {
    const { setPost } = this.props;
    setPost({}); // store의 editPost 초기화
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

  addPost = () => {
    const { addPost, location, editPost, updatePost } = this.props;
    const pathname = location.pathname.split('/');
    const boardUrl = pathname[3] ? pathname[2] : pathname[1];
    const { isEdit, title, isAnonymous, editorState } = this.state;
    // 빈 값 체크
    if (title === '') {
      this.setState({ isAlert: true, modalMessage: '제목을 입력해주세요.' });
    } else if (this.isEmpty(editorState)) {
      this.setState({ isAlert: true, modalMessage: '내용을 입력해주세요.' });
    }
    if (isEdit) {
      updatePost(editPost.board_url, editPost.id, title, JSON.stringify(editorState, null, 2), isAnonymous);
    } else {
      addPost(
        title,
        JSON.stringify(editorState, null, 2),
        boardUrl,
        !!isAnonymous // 익명이 참일때 1, 익명이 아닐 때 0
      );
    }
  };

  closeModal = () => {
    // isAlert, modalMessage 초기화
    this.setState({ isAlert: false, modalMessage: '' });
  };

  render() {
    const { isAuthenticated, boardInfo, editPost, addPostImage, location, history } = this.props;
    const { previewURL, isEdit, title, isAnonymous, isAlert, modalMessage } = this.state;
    return (
      <div className="write">
        <div className="write__top">
          <span>{isEdit ? '글수정' : '글쓰기'}</span>
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
          contents={isEdit ? editPost.body : ''}
          isAnonymous={isAnonymous}
          QuillChange={this.handleChange}
          addPostImage={addPostImage}
          handleForm={this.handleForm('title')}
          handleAnonymous={this.handleAnonymous}
          boardUrl={location.pathname.split('/')}
          isAuthenticated={isAuthenticated}
        />
        <div className="write__btn">
          <button onClick={history.goBack} className="write__btn-cancel">
            취소
          </button>
          <button onClick={this.addPost} className="write__btn-confirm">
            {isEdit ? '수정' : '등록'}
          </button>
        </div>
        {isAlert && <Modal type="alert" message={modalMessage} closeModal={this.closeModal} />}
      </div>
    );
  }
}

export default Write;
