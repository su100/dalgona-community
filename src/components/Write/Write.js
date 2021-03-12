import React, { Component } from 'react';
import photoIcon from 'images/photo.svg';
import Editor from 'components/common/Editor';
import arrowIcon from 'images/arrowIcon.png';
import './Write.scss';

class Write extends Component {
    constructor(props) {
        super(props);
        this.searchSelect = [
            { name: '일상/잡담', id: '1' },
            { name: '취미', id: '2' },
            { name: '생활정보', id: '3' },
            { name: '고민', id: '4' },
        ];
        this.state = {
            title: '',
            categoryId: '',
            isAnonymous: false,
            editorState: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(html) {
        this.setState({ editorState: html });
    }

    handleForm = (name) => (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({ [name]: value });
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
        const { match, addPost, updatePost, editPost, isAuthenticated } = this.props;
        const { title, categoryId, isAnonymous, editorState } = this.state;
        //빈 값 체크
        if (title === '') alert('제목을 입력해주세요.');
        else if (this.isEmpty(editorState)) alert('내용을 입력해주세요.');
        else {
            /* if (editPost.size > 0) {
                 //수정일 때
                 updatePost(
                     match.params.board_url,
                     editPost.get('id'),
                     title,
                     JSON.stringify(editorState, null, 2),
                     categoryId === '0' ? null : categoryId, //카테고리 선택 안 하면 null
                     anonymous ? 1 : 0 //익명이 참일때 1, 익명이 아닐 때 0)
                 );
             } else*/
            if (!isAuthenticated) {
                alert('로그인이 필요합니다.');
                this.props.history.push('/login');
            }
            addPost(
                title,
                JSON.stringify(editorState, null, 2),
                'iu',
                isAnonymous ? true : false //익명이 참일때 1, 익명이 아닐 때 0
            );
        }
    };
    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (prevProps.post_success !== this.props.post_success && this.props.post_success) {
            //댓글 작성 성공했을 때
            return 'post';
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //댓글 대댓글 입력 초기화
        if (snapshot === 'post') {
            console.log('초기화');
            this.setState({ title: null, editorState: null, isAnonymous: false });
            this.props.history.push('/luna/1');
        }
    }

    render() {
        const { title, categoryId, isAnonymous, previewURL } = this.state;
        return (
            <div className="write">
                <div className="not-pc">
                    <div className="write__top">
                        <span>글쓰기</span>
                        <button>글쓰기</button>
                    </div>
                </div>
                <div className="write__info">
                    <select
                        onChange={this.handleForm('categoryId')}
                        value={categoryId}
                        style={{ background: `url(${arrowIcon}) no-repeat 107px white` }}
                    >
                        {this.searchSelect.map((category) => {
                            return (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            );
                        })}
                    </select>
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
                    contents={''}
                    QuillChange={this.handleChange}
                    addPostImage={this.props.addPostImage}
                    handleForm={this.handleForm('title')}
                    handleAnonymous={this.handleAnonymous}
                />
                <div className="write__btn">
                    <button onClick={this.props.history.goBack} className="write__btn-cancel">
                        취소
                    </button>
                    <button onClick={this.addPost} className="write__btn-confirm">
                        확인
                    </button>
                </div>
            </div>
        );
    }
}

export default Write;
