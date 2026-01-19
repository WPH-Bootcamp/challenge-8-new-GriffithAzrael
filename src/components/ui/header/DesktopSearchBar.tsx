// Search bar that appears in the header on desktop screens.
// It does not own state – it receives the current value and callbacks
// from the container-level <Header /> component.

type DesktopSearchBarProps = {
  // Current search text.
  searchTerm: string;
  // Called whenever the user types.
  onChange: (value: string) => void;
  // Called when the clear ("x") button is clicked.
  onClear: () => void;
  // Called when the input receives focus.
  onFocus: () => void;
};

export const DesktopSearchBar = ({
  searchTerm,
  onChange,
  onClear,
  onFocus,
}: DesktopSearchBarProps) => (
  <div className='search-bar relative hidden md:flex items-center md:rounded-2xl md:bg-[#0A0D12]/60 md:backdrop-blur-2xl w-60.75 h-14 text-[16px] border-[#252B37] border px-4 py-2 gap-2'>
    <img src='/Search-bar-logo.svg' alt='Search bar logo' />

    <input
      className='search-input placeholder:text-[#717680] bg-transparent leading-7.5 outline-none flex-1 min-w-0 pr-8'
      placeholder='Search Movie'
      value={searchTerm}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
    />

    {/* Clear button on the right side of the input */}
    {searchTerm && (
      <button
        type='button'
        onClick={onClear}
        className='absolute right-4 flex items-center justify-center w-5 cursor-pointer'
      >
        <img src='/Clear-search.svg' alt='Clear search bar' />
      </button>
    )}
  </div>
);