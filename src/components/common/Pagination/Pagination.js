import React from 'react';
import './Pagination.scss';

const Pagination = ({ countList, currentPage, handlePage, isReply }) => {
  const pageRenderer = ({ count = countList }) => {
    const pageCount = isReply ? 10 : 18;
    const lastPage = Math.ceil(count / pageCount) === 0 ? 1 : Math.ceil(count / pageCount); // 가장 마지막 페이지, 1페이지 이하일 때는 1
    const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1; // 현재 페이지가 속하는 첫 페이지
    const endPage = Math.min(startPage + 4, lastPage); // 현재 페이지가 속하는 마지막페이지
    const result = [];
    const tmp = [];
    const pre = '<';
    const next = '>';

    if (lastPage === 1) {
      return (
        <button className="page-num current" id={currentPage} onClick={handlePage} value={1}>
          1
        </button>
      );
    }

    if (currentPage !== 1 && currentPage > 5) {
      // 첫페이지 아닐 때
      tmp.push(
        <button
          className="page-num"
          id={currentPage}
          key="prev"
          onClick={handlePage}
          value={(Math.floor((parseInt(currentPage, 10) + 4) / 5) - 1) * 5}
        >
          {pre}
        </button>
      );
    }
    for (let i = startPage; i <= endPage; i++) {
      tmp.push(
        <button
          className={parseInt(currentPage, 10) === i ? 'page-num-click' : 'page-num'}
          key={i}
          onClick={handlePage}
          value={i}
          id={i}
        >
          {i}
        </button>
      );
    }
    if (currentPage !== lastPage && currentPage < lastPage && endPage !== lastPage) {
      // 마지막페이지 아닐 때
      tmp.push(
        <button
          className="page-num"
          key="next"
          id={currentPage}
          onClick={handlePage}
          value={Math.floor((parseInt(currentPage, 10) + 4) / 5) * 5 + 1}
        >
          {next}
        </button>
      );
    }
    result.push(<div key={1}>{tmp}</div>);
    return result;
  };
  return <div className="pagination">{pageRenderer(countList)}</div>;
};

export default Pagination;
