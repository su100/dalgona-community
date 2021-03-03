import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import photoIcon from 'images/photo.svg';
import './Editor.scss';

const Editor = ({ readOnly, QuillChange, contents, addPostImage }) => {
    const quillElement = useRef(null); // Quill을 적용할 DivElement를 설정
    const quillInstance = useRef(null); // Quill 인스턴스를 설정 설정

    const onClickImageBtn = () => {
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();

            formData.append('image', file);

            addPostImage(formData, onAddImage);
        };
    };

    const onAddImage = (url) => {
        // Save current cursor state
        // Range {index: 48, length: 0} 꼴
        const range = quillInstance.current.getSelection(true);
        console.log(range);

        quillInstance.current.insertEmbed(range.index, 'image', url);
        quillInstance.current.setSelection(range.index + 1);
    };
    const setFocus = () => {
        const quill = quillInstance.current;
        quill.focus();
    };

    useEffect(() => {
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
                readOnly: readOnly,
            });

            // 퀼 인스턴스를 편하게 쓰기 위해 변수 설정
            const quill = quillInstance.current;
            quill.setText('내용을 입력하세요.');
            quill.formatText(0, 10, 'color', '#a7a7a7');
            if (!readOnly) {
                // 텍스트를 쳤을 때 state에 담기
                quill.on('text-change', (delta, oldDelta, source) => {
                    QuillChange(quill.getContents());
                });

                const toolbar = quill.getModule('toolbar');
                toolbar.addHandler('image', onClickImageBtn);
            }
        }
    }, []);

    // 기존 내용을 가져오기 위함(수정)
    const mounted = useRef(false);
    useEffect(() => {
        const quill = quillInstance.current;
        if (!readOnly && (contents === '' || mounted.current)) {
            return;
        }
        mounted.current = true;
        if (contents !== undefined) {
            quill.setContents(JSON.parse(contents));
        }
    }, [contents]);

    return (
        <div className={readOnly ? 'read-only editor' : 'editor'}>
            <div ref={quillElement} onClick={setFocus} />
        </div>
    );
};

export default Editor;
