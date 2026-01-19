// Container-level Footer component.

const Footer = () => {
  return (
    <footer className='flex border-t border-[#252B37] flex-col text-left bottom-0 left-0 right-0 px-4 py-6 gap-2 md:flex-row md:justify-between md:items-center md:gap-0 md:px-35'>
      <img className='w-23 md:w-32.5' src='/logo-small.svg' alt='Logo' />
      <p className='text-[#535862] text-xs leading-6 md:text-base md:leading-7.5'>
        Copyright ©2025 Movie Explorer
      </p>
    </footer>
  );
};

export default Footer;
