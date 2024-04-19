import Collection from '@/components/shared/Collection';
import { Button } from '@/components/ui/button';
import { getTeamsByUser } from '@/lib/actions/event.action';
import { auth } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

const ProfilePage = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const organizedTeams = await getTeamsByUser({ userId, page: 1 });

  return (
    <>
      {/* MY TEAMS */}

      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
          <h3 className='h3-bold text-center sm:text-left'>My Teams</h3>
          <Button asChild size='lg' className='button hidden sm:flex'>
            <Link href='/#teams'>Explore more Teams</Link>
          </Button>
        </div>
      </section>

      {/* <section className='wrapper my-8'>
        <Collection
          data={teams?.data}
          emptyTitle='No teams joined yet'
          emptyStateSubtext='No worries - plenty of teams to join'
          collectionType='My_Teams'
          limit={3}
          page={1}
          urlParamName='teamPage'
          totalPages={2}
        />
      </section> */}
      {/* EVENTS ORGANIZE */}
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
          <h3 className='h3-bold text-center sm:text-left'>Teams Organized</h3>
          <Button asChild size='lg' className='button hidden sm:flex'>
            <Link href='/teams/create'>Create New Team</Link>
          </Button>
        </div>
      </section>
      <section className='wrapper my-8'>
        <Collection
          data={organizedTeams?.data}
          emptyTitle='No teams have been created yet'
          emptyStateSubtext='Go create some now!'
          collectionType='Teams_Organized'
          limit={6}
          page={1}
          urlParamName='teamsPage'
          totalPages={2}
        />
      </section>
    </>
  );
};

export default ProfilePage;
