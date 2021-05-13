import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BOARD_DIVISION } from 'constants/index';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import './HotPostCard.scss';

const HotPostCard = ({ index, post }) => {
  const quillElement = useRef(null); // Quill을 적용할 DivElement를 설정
  const quillInstance = useRef(null); // Quill 인스턴스를 설정 설정
  const [imageURL, setImage] = useState('');

  useEffect(() => {
    // 최초 한번만 실행
    if (quillElement.current) {
      quillInstance.current = new Quill(quillElement.current, {
        readOnly: true,
      });
    }
  }, []);

  // 기존 내용을 가져오기 위함(수정)
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    let result;

    try {
      result = JSON.parse(post.body);
    } catch (e) {
      result = post.body;
    }

    if (
      !result.ops.some((element) => {
        // 가장 처음 이미지 찾기
        if (element.insert.image) {
          setImage(element.insert.image);
          return true;
        }
        return false;
      })
    ) {
      // 이미지 없으면 빈값
      setImage('');
    }

    /* 글 내용 
    // 텍스트만 보이게끔
    const tmp = result.ops.filter((element) => !element.insert.image);

    tmp.forEach((element) => {
      const string = element.insert.replace('\n', '').trim(); // 엔터 제거
      if (string !== '') {
        // 단독 공백 제거
        text.push({ insert: string });
      }
    });
    result.ops = text;
    quill.setContents(result);
    */
  }, [post]);

  return (
    <Link
      className="hot-post-card"
      to={`/${BOARD_DIVISION[post.board_url.division]}/${post.board_url.board_url}/${post.id}`}
      key={post.id}
    >
      <h3>{`0${index + 1}`}</h3>
      <h6>{post.title}</h6>
      {imageURL !== '' && <img src={imageURL} alt="post" />}
      <p className="home--hot--detail">
        <span>
          조회수
          {post.views}
        </span>
        <span>{post.created_at}</span>
        <span>
          추천
          {post.recommend_count}
        </span>
      </p>
    </Link>
  );
};

export default HotPostCard;
