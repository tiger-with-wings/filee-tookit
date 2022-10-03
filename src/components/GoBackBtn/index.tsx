import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

const GoBackBtn = ({ style, className, children }: Props) => {
  const navigate = useNavigate();
  return (
    <button style={style} className={className} onClick={
      () => {
        navigate(-1);
      }
    }>{children}</button>
  )
}

export default GoBackBtn