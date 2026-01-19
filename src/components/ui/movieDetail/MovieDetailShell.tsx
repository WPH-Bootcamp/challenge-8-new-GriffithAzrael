// Structural layout for the movie detail page:
// - Renders the full-width backdrop image with gradient overlay
// - Positions the main content section so it overlaps the backdrop
//   (using negative margin top).
//
// The actual content (mobile/desktop header, overview, cast, etc.) is passed
// in via `children`.

import type { ReactNode } from 'react';

type MovieDetailShellProps = {
  title: string;
  bgUrl: string;
  children: ReactNode;
};

export const MovieDetailShell = ({
  title,
  bgUrl,
  children,
}: MovieDetailShellProps) => (
  <div className='relative pb-10'>
    {/* BACKDROP SECTION */}
    <section className='relative w-full h-130 md:h-full overflow-hidden'>
      <img src={bgUrl} alt={title} className='w-full h-full object-cover' />
      <div className='absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent' />
    </section>

    {/* MAIN CONTENT SECTION (overlapping backdrop) */}
    <section className='relative -mt-70 md:-mt-103 px-4 md:px-35'>
      <div className='w-full mx-auto flex flex-col gap-6 md:gap-12'>
        {children}
      </div>
    </section>
  </div>
);