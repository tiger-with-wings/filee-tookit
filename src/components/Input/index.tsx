import React from 'react';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input = ({ className, ...otherProps }: Props) => {
  return (
    <input
      className={`ui-input ${className}`}
      {...otherProps}
    />
  )
}

export default Input;