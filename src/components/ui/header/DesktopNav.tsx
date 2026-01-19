// Desktop navigation links (Home, Favorites).
// Purely presentational: the parent decides what to do when "Home" is clicked.

import { Link } from 'react-router-dom';

type DesktopNavProps = {
  // Called when "Home" is clicked (e.g. to clear search, scroll to top).
  clearSearch: () => void;
};

export const DesktopNav = ({ clearSearch }: DesktopNavProps) => (
  <nav className='header-menu hidden md:flex md:gap-12'>
    <Link
      className='p-2'
      to='/'
      onClick={() => {
        window.scrollTo(0, 0);
        clearSearch();
      }}
    >
      Home
    </Link>
    <Link className='p-2' to='/favorites'>
      Favorites
    </Link>
  </nav>
);