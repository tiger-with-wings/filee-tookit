import React, { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

type Props = {
  to: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const GoToBtn = ({ to, children, style, className }: Props) => {
  const navigate = useNavigate();
  return (
    <Button style={style} className={className} onClick={
      () => {
        navigate(to);
      }
    }>{children}</Button>
  )
}

export default GoToBtn;