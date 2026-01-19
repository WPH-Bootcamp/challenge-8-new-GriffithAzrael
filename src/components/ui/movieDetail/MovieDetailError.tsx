// Error state for the movie detail page, with a "Go Back" button
// so the user can return to the previous screen.

type MovieDetailErrorProps = {
  onGoBack: () => void;
};

export const MovieDetailError = ({ onGoBack }: MovieDetailErrorProps) => (
  <div className='px-4 md:px-35 py-10 md:py-20'>
    <p className='text-red-400'>Failed to load movie details.</p>
    <button
      className='mt-4 px-4 py-2 rounded-full bg-[#0A0D12] text-sm'
      onClick={onGoBack}
    >
      Go Back
    </button>
  </div>
);