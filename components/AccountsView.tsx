'use client';

import React, { useState } from 'react';
import BankCard from './BankCard';
import IndianBankLinkModal from './IndianBankLinkModal';
import { Plus } from 'lucide-react';

function Passbook() {
  return (
    <svg width="88" height="72" viewBox="0 0 88 72" fill="none">
      <rect x="6" y="4" width="76" height="64" rx="3" stroke="#0E2A21" strokeWidth="1.5" />
      <line x1="6" y1="18" x2="82" y2="18" stroke="#D9D4C2" strokeWidth="1.5" />
      {[28, 36, 44, 52].map((y) => (
        <line key={y} x1="14" y1={y} x2="60" y2={y} stroke="#D9D4C2" strokeWidth="1.5" />
      ))}
      <circle cx="70" cy="44" r="4" fill="none" stroke="#B8863B" strokeWidth="1.5" />
      <text x="14" y="13" fontSize="7" fill="#0E2A21" fontFamily="sans-serif" fontWeight="600">PASSBOOK</text>
    </svg>
  );
}

interface AccountsViewProps {
  accounts: any[];
  user: any;
}

export const AccountsView = ({ accounts, user }: AccountsViewProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pulse, setPulse] = useState(false);

  const handleConnect = () => {
    setPulse(true);
    setIsModalOpen(true);
    setTimeout(() => setPulse(false), 1400);
  };

  const hasAccounts = accounts && accounts.length > 0;

  return (
    <>
      <div className="w-full max-w-[850px] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="bn-serif text-[26px] md:text-[28px] font-medium text-text m-0">
              Your accounts
            </h1>
            <p className="text-[13.5px] text-textMuted mt-1">
              Every account you connect appears here.
            </p>
          </div>

          {hasAccounts && (
            <button
              onClick={handleConnect}
              className="bn-btn-gold inline-flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-semibold"
            >
              <Plus size={16} />
              <span>Link Account</span>
            </button>
          )}
        </div>

        {hasAccounts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {accounts.map((a: Account) => (
              <BankCard
                key={a.id || a.appwriteItemId}
                account={a}
                userName={user?.firstName || user?.name || 'User'}
              />
            ))}
          </div>
        ) : (
          <div
            className={`w-full rounded-[10px] border border-dashed border-line bg-paperRaised p-10 sm:p-14 text-center ${
              pulse ? 'bn-pulse' : ''
            }`}
          >
            <div className="flex justify-center mb-5">
              <Passbook />
            </div>
            <h2 className="bn-serif text-[19px] font-medium text-text">
              No accounts connected yet
            </h2>
            <p className="text-[13.5px] text-textMuted max-w-[360px] mx-auto mt-2 mb-6 leading-relaxed">
              Link a bank to see balances, cards, and account details together in one place.
            </p>
            <button
              onClick={handleConnect}
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

export default AccountsView;
