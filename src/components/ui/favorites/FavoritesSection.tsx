// Layout wrapper for the Favorites page.
// It renders the section padding and the "Favorites" title.
// `variant` controls spacing for:
//  - "empty" state (large vertical gap, centered content)
//  - "list" state (normal top spacing)

import type { ReactNode } from 'react';

type FavoritesSectionProps = {
  variant: 'empty' | 'list';
  children: ReactNode;
};

export const FavoritesSection = ({
  variant,
  children,
}: FavoritesSectionProps) => {
  const base = 'px-4 md:px-35';
  const variantClasses =
    variant === 'empty'
      ? // Empty: more vertical padding + flex to center the message
        'gap-21 md:gap-26 py-22 md:pt-38.5 md:pb-90 flex flex-col'
      : // List: standard padding; children handle their own inner spacing
        'py-19.25 md:pt-38.5';

  return (
    <section className={`${base} ${variantClasses}`}>
      <h1 className='text-2xl leading-9 md:text-4xl md:leading-12 font-bold'>
        Favorites
      </h1>
      {children}
    </section>
  );
};