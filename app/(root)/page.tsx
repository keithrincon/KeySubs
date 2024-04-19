import Collection from '@/components/shared/Collection';
import { Button } from '@/components/ui/button';
import { getAllTeams } from '@/lib/actions/event.action';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const teams = await getAllTeams({
    query: '',
    category: '',
    page: 1,
    limit: 6,
  });

  console.log(teams);

  return (
    <>
      <section className='bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10'>
        <div className='wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0'>
          <div className='flex flex-col justify-center gap-8'>
            <h1 className='h1-bold'>Build your dream team or join one.</h1>
            <p className='p-regular-20 md:p-regular-24'>
              KeySubs helps team managers fill there rosters with players of
              there choice and free agents to find a team that fits there needs.
            </p>
            <Button size='lg' asChild className='button w-full sm:w-fit'>
              <Link href='#teams'>Explore Now</Link>
            </Button>
          </div>

          <Image
            src='/assets/images/hero.png'
            alt='hero'
            width={1000}
            height={1000}
            className='max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]'
          />
        </div>
      </section>

      <section
        id='team'
        // id='events'
        className='wrapper my-8 flex flex-col gap-8 md:gap-12'
      >
        <h2 className='h2-bold'>
          Trusted by hundreds of friends and organizations
        </h2>

        <div className='flex w-full flex-col gap-5 md:flex-row'>
          {/* <Search />
          <CategoryFilter /> */}
        </div>

        <Collection
          data={teams?.data}
          emptyTitle='No teams yet created'
          emptyStateSubtext='Comeback later'
          collectionType='All_Teams'
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>
    </>
  );
}
