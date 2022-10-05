import React from 'react';

type Props = {
  styleType?: 'default' | 'success' | 'warn' | 'error';
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button = ({ styleType = 'default', onClick, children, className, ...otherProps }: Props) => {
  return (
    <button
      className={`ui-button ui-style-type-${styleType} ${className}`}
      onClick={onClick}
      {...otherProps}
    >{children}</button>
  )
}

export default Button;