import React from 'react';

import './ArticleList.scss';

const ArticleList = ({ articleList }) => (
  <div className="article-list">
    {articleList.map((article) => (
      <a href={article.link} target="_blank" rel="noreferrer" key={article.link} className="article-list__item">
        <div className="article-list__image">{article.image && <img src={article.image} alt="news" />}</div>
        <div className="article-list__box">
          <h6>{article.title}</h6>
          <p>{article.date}</p>
        </div>
      </a>
    ))}
  </div>
);
export default ArticleList;
