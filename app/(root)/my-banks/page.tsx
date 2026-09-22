import React from 'react';
import AccountsView from '@/components/AccountsView';
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ 
    userId: loggedIn?.$id 
  });

  return (
    <section className="flex w-full flex-col p-6 sm:p-10 lg:p-12">
      <AccountsView 
        accounts={accounts?.data || []}
        user={loggedIn}
      />
    </section>
  );
};

export default MyBanks;