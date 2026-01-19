// Simple layout wrapper for the Trending area.
// Renders the section spacing + title and lets callers provide the body.

import type { ReactNode } from 'react';

type TrendingSectionProps = {
  title: string;
  children: ReactNode;
};

export const TrendingSection = ({ title, children }: TrendingSectionProps) => (
  <section className='trending-section px-4 py-10 md:px-35 md:pt-0 md:pb-20'>
    <h2 className='section-title font-bold text-2xl leading-9 md:text-4xl md:leading-12'>
      {title}
    </h2>

    {children}
  </section>
);