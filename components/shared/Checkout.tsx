import React from 'react';
import { Button } from '../ui/button';
import { ITeam } from '@/lib/database/models/team.model';

const Checkout = ({ team, userId }: { team: ITeam; userId: string }) => {
  const onCheckout = async () => {
    console.log('checkout');
  };
  return (
    <form action={onCheckout} method='post'>
      <Button></Button>
    </form>
  );
};

export default Checkout;
