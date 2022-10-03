import React, { ReactNode } from 'react';
import './index.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  children: ReactNode;
  className?: string;
}

const NavCard = ({ to, children, className }: Props) => {
  return (
    <NavLink className={`nav-card ${className}`} to={to} >
      {children}
    </NavLink>
  )
}

export default NavCard;