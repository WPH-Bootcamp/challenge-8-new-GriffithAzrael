// Small action area on the right side of the header for mobile view.
// Shows the search icon and the hamburger / close icon.

type MobileActionsProps = {
  // Whether the mobile menu overlay is currently open.
  isMobileMenuOpen: boolean;
  // Open the full-screen search overlay.
  onOpenSearch: () => void;
  // Toggle the mobile menu overlay (hamburger ↔ close).
  onToggleMenu: () => void;
};

export const MobileActions = ({
  isMobileMenuOpen,
  onOpenSearch,
  onToggleMenu,
}: MobileActionsProps) => (
  <div className='mobile-menu-container flex gap-6 md:hidden'>
    {/* Hide the search icon when the menu is already open to avoid clutter */}
    {!isMobileMenuOpen && (
      <button type='button' onClick={onOpenSearch}>
        <img className='w-6' src='/Search.svg' alt='Search button' />
      </button>
    )}

    <button type='button' onClick={onToggleMenu}>
      <img
        className='w-6'
        src={isMobileMenuOpen ? '/Close-mobile.svg' : '/Menu-mobile.svg'}
        alt={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
      />
    </button>
  </div>
);