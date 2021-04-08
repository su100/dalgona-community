import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FindIdPw from 'components/common/FindIdPw';
import './FindId.scss';

class FindId extends Component {
  constructor(props) {
    super(props);
    this.state = { stage: 1 };
  }

  goNextStage = () => {
    this.setState({ stage: 2 });
  };

  goHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { stage } = this.state;
    return (
      <div className="find-id">
        <h2>아이디 비밀번호 찾기</h2>

        <div className="find-id-pw__tab">
          <Link to="/find/id" className="active">
            아이디 찾기
          </Link>
          <Link to="/find/pw">비밀번호 찾기</Link>
        </div>
        {stage === 1 ? (
          <FindIdPw idpw="id" goNextStage={this.goNextStage} />
        ) : (
          <div className="find-id--next">
            <p>
              고객님의 정보와 일치하는 아이디입니다.
              <br />
              <span>로그인 또는 비밀번호 찾기 버튼을 눌러주세요.</span>
            </p>
            <h3>aa1234</h3>
            <Link to="/login" className="find-id__button">
              로그인
            </Link>
            <Link to="/find/pw" className="find-id__button">
              비밀번호 찾기
            </Link>
            <button type="button" className="find-id__button--finish" onClick={this.goHome}>
              확인
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default FindId;
