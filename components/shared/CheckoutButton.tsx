'use client';

import { ITeam } from '@/lib/database/models/team.model';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import Checkout from './Checkout';

const CheckoutButton = ({ team }: { team: ITeam }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasSeasonFinished = new Date(team.endDateTime) < new Date();

  return (
    <div className='flex items-center gap-3'>
      {/* Cannot pay for past registrations  */}
      {hasSeasonFinished ? (
        <p p-2 text-red-400>
          Sorry, its too late to register for this season.
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className='button rounded-full' size='lg'>
              <Link href='/sign-in'>Pay Registaration Fee</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout team={team} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
