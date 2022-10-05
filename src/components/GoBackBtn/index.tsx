import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

type Props = {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

const GoBackBtn = ({ style, className, children }: Props) => {
  const navigate = useNavigate();
  return (
    <Button
      style={style}
      className={className}
      onClick={
        () => {
          navigate(-1);
        }
      }>{children}</Button>
  )
}

export default GoBackBtn