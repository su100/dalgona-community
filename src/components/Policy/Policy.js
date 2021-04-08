import React, { useEffect, useState } from 'react';
import { termsCommunity, termsPrivate } from 'constants/index.js';
import './Policy.scss';

const Policy = ({ match, history }) => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  useEffect(() => {
    // 처음 한번만 실행
    const { type } = match.params;
    if (type !== 'service' && type !== 'privacy') {
      history.replace('/notfound');
    } else if (type === 'service') {
      setTitle('이용약관(Terms of service)');
      setContents(termsCommunity);
    } else if (type === 'privacy') {
      setTitle('개인정보취급방침(Privacy Policy)');
      setContents(termsPrivate);
    }
  }, [match.params.type]);

  return (
    <div className="policy">
      <h4>{title}</h4>
      <pre>{contents}</pre>
    </div>
  );
};

export default Policy;
