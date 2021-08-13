import React, { ReactElement, ReactNode, MouseEvent } from 'react';
import ReactDOM from 'react-dom';

interface IProps {
  title: string;
  content: string;
  actions: ReactElement<ReactNode>;
  onDismiss: (e: MouseEvent) => void;
}

const Modal = ({ title, content, actions, onDismiss }: IProps) => {
  return ReactDOM.createPortal(
    <div onClick={onDismiss} className="ui dimmer modals visible active">
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{title}</div>
        <div className="content">{content}</div>
        <div className="actions">{actions}</div>
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
