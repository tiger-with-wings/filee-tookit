import React, { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {
  to: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const GoToBtn = ({ to, children, style, className }: Props) => {
  const navigate = useNavigate();
  return (
    <button style={style} className={className} onClick={
      () => {
        navigate(to);
      }
    }>{children}</button>
  )
}

export default GoToBtn;