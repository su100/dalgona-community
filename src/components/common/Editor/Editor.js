import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import photoIcon from 'images/photo.svg';
import './Editor.scss';

const Editor = ({
  readOnly,
  QuillChange,
  boardTitle,
  title,
  contents,
  addPostImage,
  handleForm,
  handleAnonymous,
  isAnonymous,
}) => {
  const quillElement = useRef(null); // Quill을 적용할 DivElement를 설정
  const quillInstance = useRef(null); // Quill 인스턴스를 설정 설정
  const fileInput = useRef(null); // 사진첨부

  const onAddImage = (url) => {
    // quill에 이미지블럭 추가
    // Save current cursor state
    // Range {index: 48, length: 0} 꼴
    const range = quillInstance.current.getSelection(true);
    quillInstance.current.insertEmbed(range.index, 'image', url);
    quillInstance.current.setSelection(range.index + 1);
  };

  const selectImg = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('image', file);
    addPostImage(formData, onAddImage);
  };

  const setFocus = () => {
    const quill = quillInstance.current;
    quill.focus();
  };

  const onClickSelect = () => {
    fileInput.current.click();
  };

  useEffect(() => {
    // 최초 한번만 실행
    if (quillElement.current) {
      quillInstance.current = new Quill(quillElement.current, {
        theme: 'bubble',
        modules: {
          // 더 많은 옵션
          // https://quilljs.com/docs/modules/toolbar/ 참고
          toolbar: [
            [{ header: '1' }, { header: '2' }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block', 'link'],
          ],
        },
        readOnly,
      });

      // 퀼 인스턴스를 편하게 쓰기 위해 변수 설정
      const quill = quillInstance.current;
      if (!readOnly) {
        // 텍스트를 쳤을 때 state에 담기
        quill.on('text-change', () => {
          QuillChange(quill.getContents());
        });

        const toolbar = quill.getModule('toolbar');
        toolbar.addHandler('image', selectImg);
      }
    }
  }, []);

  // 기존 내용을 가져오기 위함(수정)
  const mounted = useRef(false);
  useEffect(() => {
    const quill = quillInstance.current;
    if ((!readOnly && !mounted.current && contents === '') || (readOnly && !contents)) {
      return;
    }
    mounted.current = true;
    let result;
    try {
      result = JSON.parse(contents);
    } catch (e) {
      result = contents;
    }
    quill.setContents(result);
  }, [contents]);

  return (
    <div className={readOnly ? 'read-only editor' : 'editor'}>
      {!readOnly && (
        <div className="editor-top">
          <div className="editor-top__row">
            <div className="editor-top__row-boardname">{boardTitle}</div>
            <div className="editor-photo-btn">
              <label htmlFor="anonymous">
                <input type="checkbox" checked={isAnonymous} onChange={handleAnonymous} id="anonymous" />
                익명
              </label>
              <button className="btn-photo" onClick={onClickSelect}>
                <img src={photoIcon} alt="add-pic" />
                <span>파일선택</span>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInput}
                  onChange={selectImg}
                  onClick={(e) => {
                    e.target.value = null;
                  }}
                />
              </button>
            </div>
          </div>
          <div className="editor-title">
            <input
              value={title}
              onChange={handleForm}
              className="post-editor-title"
              type="text"
              placeholder="제목을 입력해주세요"
            />
          </div>
        </div>
      )}
      <div className={!readOnly ? 'write__contents' : 'read__contents'}>
        <div ref={quillElement} onClick={setFocus} />
      </div>
    </div>
  );
};

export default Editor;
