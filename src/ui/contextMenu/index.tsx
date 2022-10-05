import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom/client";
import './index.scss';

const element = document.createElement('div');
element.id = 'contextMenu';
document.body.append(element);

const modalRoot = ReactDOM.createRoot(
  element
);

type Props = {
  children?: ReactNode;
  clientX?: number;
  clientY?: number;
  hidden?: boolean;
}

const ContextMenu = ({ children, clientX, clientY, hidden }: Props) => {
  useEffect(() => {
    const handler = () => {
      contextMenu.hide();
    }
    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    }
  }, []);
  return (
    <React.StrictMode>
      <div
        hidden={hidden}
        className="context-menu"
        style={{
          left: clientX,
          top: clientY,
        }}
        onContextMenu={
          (e) => {
            e.preventDefault();
          }
        }
      >
        {children}
      </div>
    </React.StrictMode>
  )
}

const contextMenu = {
  show(children: React.ReactNode, clientX: number = 0, clientY: number = 0) {
    modalRoot.render(
      <ContextMenu clientX={clientX} clientY={clientY}>
        {children}
      </ContextMenu>
    );
  },
  hide() {
    modalRoot.render(
      <ContextMenu hidden />
    );
  }
}

export default contextMenu;