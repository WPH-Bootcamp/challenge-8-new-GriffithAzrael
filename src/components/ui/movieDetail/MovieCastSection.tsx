// Renders the "Cast & Crew" section. Shows up to a handful of cast members with their profile image, name, and character name if available.
// To keep the UI components decoupled from the API shape, I define a lightweight MovieCastMember type here and let the container map its data into this shape.

export type MovieCastMember = {
  id: number;
  name: string;
  character?: string | null;
  profile_path?: string | null;
};

type MovieCastSectionProps = {
  cast: MovieCastMember[];
  imageBaseUrl: string;
};

export const MovieCastSection = ({
  cast,
  imageBaseUrl,
}: MovieCastSectionProps) => {
  if (cast.length === 0) return null;

  return (
    <section className='flex flex-col gap-4 md:gap-6'>
      <h2 className='text-xl leading-8.5 md:text-[32px] md:leading-11.5 font-bold'>
        Cast & Crew
      </h2>

      <div className='grid md:grid-cols-3 gap-4 md:gap-10'>
        {cast.map((person) => {
          const profileUrl = person.profile_path
            ? `${imageBaseUrl}${person.profile_path}`
            : '/cast-placeholder.png';

          return (
            <div
              key={person.id}
              className='flex gap-3 md:gap-4 items-center'
            >
              <img
                src={profileUrl}
                alt={person.name}
                className='w-13.75 h-21 md:w-17.25 md:h-26 rounded-lg object-cover'
              />
              <div className='md:gap-1'>
                <p className='text-sm font-semibold leading-7 md:text-base md:leading-7.5 text-white'>
                  {person.name}
                </p>
                {person.character && (
                  <p className='text-sm leading-7 md:text-base md:leading-7.5 text-[#A4A7AE]'>
                    {person.character}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};