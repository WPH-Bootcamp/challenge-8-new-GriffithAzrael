// Layout wrapper for the hero section:
// - Handles the full-width background image
// - Adds the gradient overlay
// - Positions the content block at the bottom
// Content inside the hero (title, description, buttons) is passed as `children`.

import type { ReactNode } from 'react';

type HeroShellProps = {
  // Used for the <img alt> text.
  title: string;
  // URL of the hero background image (backdrop or poster).
  backgroundUrl: string;
  // Anything rendered on top of the background (title, buttons, etc.).
  children: ReactNode;
};

export const HeroShell = ({
  title,
  backgroundUrl,
  children,
}: HeroShellProps) => (
  <section className='hero-section'>
    <div className='movie-preview-container relative w-full h-130 md:h-full overflow-hidden'>
      {/* Background image */}
      <img
        className='movie-preview-image w-full h-86.25 object-cover md:h-full'
        src={backgroundUrl}
        alt={title}
      />

      {/* Gradient overlay to make text readable on top of the image */}
      <div className='pointer-events-none absolute h-86.25 inset-0 bottom-0 bg-linear-to-t from-black via-black/20 to-transparent z-10 md:h-full md:via-black/60' />

      {/* Foreground content (title, description, buttons) */}
      <div className='movie-details absolute px-4 bottom-0 flex flex-col gap-6 z-20 md:gap-12 md:px-0 md:pl-35 md:pb-50'>
        {children}
      </div>
    </div>
  </section>
);