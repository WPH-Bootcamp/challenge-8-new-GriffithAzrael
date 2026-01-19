// Shared "Overview" section used on the detail page.
//
// `overview` can be missing (undefined / null) depending on the API result, so I handle that here and show a friendly fallback message.

type MovieOverviewSectionProps = {
  // Optional overview text from the API.
  overview?: string | null;
};

export const MovieOverviewSection = ({
  overview,
}: MovieOverviewSectionProps) => {
  // Fallback text when the API doesn't provide an overview.
  const text =
    overview && overview.trim().length > 0
      ? overview
      : 'No overview available.';

  return (
    <section className='max-w-full flex flex-col gap-2'>
      <h2 className='text-xl leading-8.5 md:text-[32px] md:leading-11.5 font-bold'>
        Overview
      </h2>
      <p className='text-sm md:text-base text-[#A4A7AE] leading-7 md:leading-7.5'>
        {text}
      </p>
    </section>
  );
};