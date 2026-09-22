import React from 'react';
import TransactionHistoryView from '@/components/TransactionHistoryView';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const TransactionHistory = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ 
    userId: loggedIn?.$id 
  });

  const accountsData = accounts?.data || [];
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = appwriteItemId ? await getAccount({ appwriteItemId }) : null;

  const rowsPerPage = 10;
  const totalTransactions = account?.transactions?.length || 0;
  const totalPages = Math.ceil(totalTransactions / rowsPerPage) || 1;

  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = (account?.transactions || []).slice(
    indexOfFirstTransaction, indexOfLastTransaction
  );

  return (
    <section className="flex w-full flex-col p-6 sm:p-10 lg:p-12">
      <TransactionHistoryView
        account={account}
        currentTransactions={currentTransactions}
        totalPages={totalPages}
        currentPage={currentPage}
        user={loggedIn}
      />
    </section>
  );
};

export default TransactionHistory;