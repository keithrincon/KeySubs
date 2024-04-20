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
            <h1 className='h1-bold'>
              KeySubs is for helping athletes find sports teams to join.
            </h1>
            <p className='p-regular-20 md:p-regular-24'>
              Team Managers: Post your team & type of player.
              <br />
              Athletes: Find a team & join the action.
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

      <section id='team' className='wrapper my-8 flex flex-col gap-8 md:gap-12'>
        <h2 className='h2-bold'>
          Trusted by: <br /> Big League Dreams <br /> Redding Soccer Park <br />
          and more...
        </h2>

        <div className='flex w-full flex-col gap-5 md:flex-row'></div>

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
