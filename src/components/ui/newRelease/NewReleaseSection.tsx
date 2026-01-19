// Layout wrapper for the "New Release" area.
// Renders the section padding + title and lets callers supply the content.

import type { ReactNode } from 'react';

type NewReleaseSectionProps = {
  title: string;
  children: ReactNode;
};

export const NewReleaseSection = ({
  title,
  children,
}: NewReleaseSectionProps) => (
  <section className='new-release-section px-4 md:px-35 md:pb-22.5'>
    <h2 className='section-title font-bold text-2xl leading-9 md:text-4xl md:leading-12'>
      {title}
    </h2>

    {children}
  </section>
);