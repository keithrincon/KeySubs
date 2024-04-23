import Collection from '@/components/shared/Collection';
import { Button } from '@/components/ui/button';
import { getTeamsByUser } from '@/lib/actions/event.action';
import { getOrdersByUser } from '@/lib/actions/order.actions';
import { IOrder } from '@/lib/database/models/order.model';
import { SearchParamProps } from '@/types';
import { auth } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  // gets the user id from the session
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage || 1);
  const teamsPage = Number(searchParams?.teamsPage || 1);

  const orders = await getOrdersByUser({ userId, page: ordersPage });

  const orderedTeams = orders?.data.map((order: IOrder) => order.event) || [];

  const organizedTeams = await getTeamsByUser({ userId, page: teamsPage });

  return (
    <>
      {/* REGISTERED TEAMS */}
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
          <h3 className='h3-bold text-center sm:text-left'>Registered Teams</h3>
          <Button asChild size='lg' className='button hidden sm:flex'>
            <Link href='/#teams'>Explore more Teams</Link>
          </Button>
        </div>
      </section>

      {/* MY TEAMS */}
      <section className='wrapper my-8'>
        <Collection
          data={orderedTeams}
          emptyTitle='No teams joined yet'
          emptyStateSubtext='No worries - plenty of sports teams to play in!'
          collectionType='My_Registrations'
          limit={3}
          page={ordersPage}
          urlParamName='ordersPage'
          totalPages={orders?.totalPages}
        />
      </section>

      {/* TEAMS CREATED */}
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
          <h3 className='h3-bold text-center sm:text-left'>Teams Created</h3>
          <Button asChild size='lg' className='button hidden sm:flex'>
            <Link href='/teams/create'>Create New Team</Link>
          </Button>
        </div>
      </section>
      <section className='wrapper my-8'>
        <Collection
          data={organizedTeams?.data}
          emptyTitle='No teams have been created yet'
          emptyStateSubtext='Feel free to create yours now!'
          collectionType='Teams_Organized'
          limit={3}
          page={teamsPage}
          urlParamName='teamsPage'
          totalPages={organizedTeams?.totalPages}
        />
      </section>
    </>
  );
};

export default ProfilePage;
