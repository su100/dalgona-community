import React, { Component } from 'react';
import './Modal.scss';

class Modal extends Component {
  render() {
    const { type, message, closeModal, confirmModal } = this.props;
    return (
      <div className="modal">
        <div className="modal-box">
          <pre className="modal-title">{message}</pre>
          <div className="modal-btnarea">
            {type === 'confirm' && <button onClick={confirmModal}>확인</button>}
            <button onClick={closeModal}>{type === 'alert' ? '확인' : '취소'}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
