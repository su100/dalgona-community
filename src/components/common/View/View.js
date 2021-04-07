import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Editor from 'components/common/Editor';
import './View.scss';

class View extends Component {
  render() {
    const { postInfo, type, location, isSuperuser, editPost, deletePost } = this.props;
    const path = location.pathname.split('/');
    return (
      <div className="view">
        <div className="view__detail">
          <Link to={`/${type}/${path[2]}`}>
            <span>
              홈 &lt;
              {type === `luna` && `루나>${path[2]}`}
              {type === `free` && `자유>${path[2]}`}
              {type === `notice` && `달고나>공지사항`}
              {type === `event` && `달고나>이벤트`}
            </span>
          </Link>
        </div>
        <div className="view__title">
          <span>{postInfo.title}</span>
        </div>
        <div className="view__info">
          <div className="only-pc">
            <span>{postInfo.anonymous ? '익명' : postInfo.author && postInfo.author.nickname}</span>
            <span>{moment(new Date(postInfo.created_at)).format('YYYY/MM/DD HH:MM')}</span>
            <span>
              조회수
              {postInfo.views}
            </span>
          </div>
          <span className="not-pc">
            {!postInfo.anonymous && postInfo.author ? postInfo.author.nickname : '익명 '}
            {` | 조회수${postInfo.views} | ${moment(new Date(postInfo.created_at)).format('HH:MM')} ${
              postInfo.recommend_count
            }`}
          </span>
          {(isSuperuser || postInfo.is_author) && (
            <div className="view__btn-area">
              <button onClick={editPost}>수정</button>
              <button onClick={deletePost}>삭제</button>
            </div>
          )}
        </div>
        <div className="view__post">
          <Editor readOnly contents={postInfo.body} />
        </div>
      </div>
    );
  }
}
export default View;
