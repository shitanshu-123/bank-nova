'use client';

import React, { useState } from 'react';
import HeaderBox from './HeaderBox';
import { Pagination } from './Pagination';
import TransactionsTable from './TransactionsTable';
import IndianBankLinkModal from './IndianBankLinkModal';
import { formatAmount } from '@/lib/utils';
import { Plus } from 'lucide-react';

function Ledger() {
  return (
    <svg width="88" height="72" viewBox="0 0 88 72" fill="none">
      <path d="M14 4 H74 L74 68 L14 68 Z" stroke="#0E2A21" strokeWidth="1.5" />
      <path d="M14 4 L8 10 L8 66 L14 68" stroke="#0E2A21" strokeWidth="1.5" strokeLinejoin="round" />
      {[16, 24, 32, 40, 48, 56].map((y) => (
        <line key={y} x1="20" y1={y} x2="68" y2={y} stroke="#D9D4C2" strokeWidth="1.5" strokeDasharray={y === 40 ? "0" : "1 4"} />
      ))}
      <line x1="20" y1="40" x2="52" y2="40" stroke="#B8863B" strokeWidth="1.5" />
    </svg>
  );
}

interface TransactionHistoryViewProps {
  account: any;
  currentTransactions: any[];
  totalPages: number;
  currentPage: number;
  user: any;
}

export const TransactionHistoryView = ({
  account,
  currentTransactions,
  totalPages,
  currentPage,
  user,
}: TransactionHistoryViewProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="w-full max-w-[850px] space-y-6">
        <div>
          <h1 className="bn-serif text-[26px] md:text-[28px] font-medium text-text m-0">
            Transaction history
          </h1>
          <p className="text-[13.5px] text-textMuted mt-1">
            A running record of everything that moves.
          </p>
        </div>

        {account && currentTransactions && currentTransactions.length > 0 ? (
          <div className="space-y-6">
            <div className="rounded-[10px] border border-line bg-paperRaised p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="bn-serif text-[18px] font-medium text-text">
                  {account?.data?.name || 'Bank Account'}
                </h2>
                <p className="text-[13px] text-textMuted mt-0.5">
                  {account?.data?.officialName || 'Primary Checking'}
                </p>
                <p className="text-[13px] font-mono font-medium text-text mt-1 tracking-wider">
                  ●●●● ●●●● ●●●● {account?.data?.mask || '0000'}
                </p>
              </div>

              <div className="sm:text-right border-t sm:border-t-0 border-line pt-3 sm:pt-0 w-full sm:w-auto">
                <p className="text-[12px] uppercase font-medium text-textMuted tracking-wider">Current balance</p>
                <p className="bn-serif text-[28px] font-medium text-text leading-tight mt-0.5">
                  {formatAmount(account?.data?.currentBalance || 0)}
                </p>
              </div>
            </div>

            <section className="rounded-[10px] border border-line bg-paperRaised p-5 shadow-sm overflow-hidden">
              <TransactionsTable transactions={currentTransactions} />
              {totalPages > 1 && (
                <div className="my-4 w-full">
                  <Pagination totalPages={totalPages} page={currentPage} />
                </div>
              )}
            </section>
          </div>
        ) : (
          <div className="w-full rounded-[10px] border border-dashed border-line bg-paperRaised p-10 sm:p-14 text-center">
            <div className="flex justify-center mb-5">
              <Ledger />
            </div>
            <h2 className="bn-serif text-[19px] font-medium text-text">
              Nothing to show yet
            </h2>
            <p className="text-[13.5px] text-textMuted max-w-[360px] mx-auto mt-2 mb-6 leading-relaxed">
              Once you connect an account, every transaction lands here — in order, down to the rupee.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bn-btn-gold px-6 py-2.5 rounded-md text-[13.5px] font-semibold shadow-sm inline-flex items-center gap-2"
            >
              <Plus size={16} />
              <span>Connect your bank</span>
            </button>
          </div>
        )}
      </div>

      <IndianBankLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </>
  );
};

export default TransactionHistoryView;
