import ReactDOM from 'react-dom';
import { ReactNode } from 'react';

export interface DialogProps {
  children: ReactNode;
}

export function Dialog(props: DialogProps) {
  const dialogContainer = document.getElementById('dialog-container') as Element;
  return ReactDOM.createPortal(
    props.children,
    dialogContainer
  );
}
