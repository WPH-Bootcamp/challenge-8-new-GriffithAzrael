// Simple logo component used in the header.
// It wraps the logo image in a <Link/> and calls `onClick` for side effects
// (for example: closing menus, clearing search, scrolling to top).

import { Link } from 'react-router-dom';

type LogoProps = {
  // Called when the logo is clicked (before navigation).
  onClick: () => void;
};

export const Logo = ({ onClick }: LogoProps) => (
  <Link to='/' onClick={onClick}>
    <img className='w-23 md:w-32.5' src='/logo-small.svg' alt='Logo' />
  </Link>
);