import React from 'react';

import photoIcon from 'images/photo.svg';

import './CommentInput.scss';

const CommentInput = (props) => {
    let fileInput = React.createRef();

    const selectImg = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            props.setImage(props.type, file);
            props.setPreview(props.type, reader.result);
        };
        reader.readAsDataURL(file);
    };

    const onClickSelect = (e) => {
        fileInput.current.click();
    };

    const onClickPost = (e) => {
        props.postVoteReply(e);
    };

    return (
        <div className={`comment-input ${props.type}`}>
            {props.previewURL && (
                <div className="comment-input__preview">
                    <div className="comment-input__preview--background" />
                    <img src={props.previewURL} alt="preview" />
                    <button id={props.type} onClick={props.deleteImg}>
                        X
                    </button>
                </div>
            )}
            <div>
                <textarea
                    id={props.type}
                    className="comment-input__input"
                    value={props.commentText}
                    onChange={props.handleComment}
                    placeholder="댓글을 입력하세요."
                />
            </div>
            <div className="comment-input--bottom">
                <div className="comment-input--bottom-file">
                    <span>
                        <input
                            id={props.type}
                            type="checkbox"
                            checked={props.isAnonymous}
                            onChange={props.handleAnonymous}
                        />
                        익명
                    </span>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInput}
                        id={props.type}
                        onChange={selectImg}
                        onClick={(event) => {
                            event.target.value = null;
                        }}
                    />
                    <button id={props.type} onClick={onClickSelect}>
                        <img src={photoIcon} alt="photoIcon" /> 파일선택
                    </button>
                </div>
                <div>
                    <button id={props.type} className="comment-input__button--submit" onClick={onClickPost}>
                        <span className="only-pc"> 등록 </span>
                        <span className="not-pc"> 등록하기 </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentInput;
