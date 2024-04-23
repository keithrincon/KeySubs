import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

import { ITeam } from '@/lib/database/models/team.model';
import { Button } from '../ui/button';
import { checkoutOrder } from '@/lib/actions/order.actions';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ team, userId }: { team: ITeam; userId: string }) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log(
        'Order canceled -- continue to shop around and checkout when you’re ready.'
      );
    }
  }, []);

  const onCheckout = async () => {
    const order = {
      teamTitle: team.title,
      teamId: team._id,
      price: team.price,
      isFree: team.isFree,
      buyerId: userId,
    };
    await checkoutOrder(order);
  };

  return (
    <form action={onCheckout} method='post'>
      <Button type='submit' role='link' size='lg' className='button sm:w-fit'>
        {team.isFree ? 'Register' : 'Pay Registration Fee'}
      </Button>
    </form>
  );
};

export default Checkout;
