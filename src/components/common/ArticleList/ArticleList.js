import React from 'react';

import './ArticleList.scss';

const ArticleList = ({ articleList }) => {
    console.log(articleList);
    return (
        <div className="article-list">
            {articleList.map((article, index) => {
                return (
                    <a href={article.link} target="_blank" rel="noreferrer" key={index} className="article-list__item">
                        <img src={article.image} alt="news" />
                        <div>
                            <h6>{article.title}</h6>
                            <p>{article.date}</p>
                        </div>
                    </a>
                );
            })}
        </div>
    );
};
export default ArticleList;
