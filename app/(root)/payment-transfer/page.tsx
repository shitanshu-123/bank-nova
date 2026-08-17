import HeaderBox from '@/components/HeaderBox';
import TransferTabs from '@/components/TransferTabs';
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react';

const Transfer = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ 
    userId: loggedIn?.$id 
  });

  const accountsData = accounts?.data || [];

  return (
    <section className="payment-transfer">
      <HeaderBox 
        title="Fund Transfer & UPI Hub"
        subtext="Send money instantly via Google Pay, UPI ID, Phone Number, QR Code, or Bank ACH"
      />

      <section className="size-full pt-6">
        <TransferTabs user={loggedIn} accounts={accountsData} />
      </section>
    </section>
  );
};

export default Transfer;