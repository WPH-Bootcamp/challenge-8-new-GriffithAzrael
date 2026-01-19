// Renders the hero title and description text block.

type HeroTextProps = {
  title: string;
  description: string;
};

export const HeroText = ({ title, description }: HeroTextProps) => (
  <div className='movie-text flex flex-col gap-1.5 md:w-158.75 md:gap-4'>
    <h1 className='movie-title text-2xl leading-9 md:text-5xl md:leading-15 md:tracking-tight font-bold'>
      {title}
    </h1>
    <p className='movie-desc text-sm leading-7 md:text-base md:leading-7.5 text-[#A4A7AE]'>
      {description}
    </p>
  </div>
);