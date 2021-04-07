import React from 'react';

import photoIcon from 'images/photo.svg';

import './CommentInput.scss';

const CommentInput = ({
  type,
  isAnonymous,
  previewURL,
  deleteImg,
  commentText,
  handleComment,
  handleAnonymous,
  setImage,
  setPreview,
  addReply,
  updateReply,
  updateRereply,
  addRereply,
}) => {
  const fileInput = React.createRef();

  const selectImg = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setImage(type, file);
      setPreview(type, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onClickSelect = () => {
    fileInput.current.click();
  };

  const onClickPost = (e) => {
    const { id } = e.currentTarget;
    if (id === 'comment') {
      addReply(e);
    } else if (id === 'update-reply') {
      updateReply(e);
    } else if (id === 'update-rereply') {
      updateRereply(e);
    } else {
      addRereply(e);
    }
  };

  return (
    <div className={`comment-input ${type}`}>
      {previewURL && (
        <div className="comment-input__preview">
          <div className="comment-input__preview--background" />
          <img src={previewURL} alt="preview" />
          <button id={type} onClick={deleteImg}>
            X
          </button>
        </div>
      )}
      <textarea
        id={type}
        className="comment-input__input"
        value={commentText}
        onChange={handleComment}
        placeholder="댓글을 입력하세요."
      />
      <div className="comment-input--bottom">
        <div className="comment-input--bottom-file">
          <span>
            <input id={type} type="checkbox" checked={isAnonymous} onChange={handleAnonymous} />
            익명
          </span>
          <input
            type="file"
            accept="image/*"
            ref={fileInput}
            id={type}
            onChange={selectImg}
            onClick={(event) => {
              event.target.value = null;
            }}
          />
          <button id={type} onClick={onClickSelect}>
            <img src={photoIcon} alt="photoIcon" />
            <span>파일선택</span>
          </button>
        </div>
        <div>
          <button id={type} className="comment-input__button--submit" onClick={onClickPost}>
            <span className="only-pc"> 등록 </span>
            <span className="not-pc"> 등록하기 </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
