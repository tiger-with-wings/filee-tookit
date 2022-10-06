import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import GoBackBtn from '../GoBackBtn';
import GoToBtn from '../GoToBtn';

type Props = {
  title?: string;
  children?: ReactNode;
}

const SimpleHeader = ({ title, children }: Props) => {
  const location = useLocation();
  return (
    <header className="page-header">
      <h1 className="title">{title}</h1>

      <div hidden={location.pathname === '/'} className="control-wrap">
        <GoToBtn to="/">返回首页</GoToBtn>
        <GoBackBtn>返回</GoBackBtn>
        {
          children
        }
      </div>

    </header >
  )
}

export default SimpleHeader;