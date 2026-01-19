// Full-screen navigation overlay for mobile.
// This is shown below the header when the hamburger menu is toggled open.

import { Link } from 'react-router-dom';

type MobileMenuProps = {
  // Controlled from the parent: whether the menu should be visible.
  isOpen: boolean;
  // Close the menu (used after clicking a link).
  onClose: () => void;
};

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <nav className='fixed inset-0 top-16 bg-black z-40 px-4 pt-6 md:hidden'>
      <ul className='flex flex-col gap-4 text-white text-base'>
        <li>
          <Link
            to='/'
            className='flex leading-7.5 p-2'
            onClick={() => {
              onClose();
              window.scrollTo(0, 0);
            }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to='/favorites'
            className='flex leading-7.5 p-2'
            onClick={onClose}
          >
            Favorites
          </Link>
        </li>
      </ul>
    </nav>
  );
};