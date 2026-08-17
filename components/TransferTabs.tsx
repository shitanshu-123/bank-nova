'use client';

import React, { useState } from 'react';
import GooglePayTransfer from './GooglePayTransfer';
import PaymentTransferForm from './PaymentTransferForm';
import { Zap, Building2, ShieldCheck, ArrowLeftRight } from 'lucide-react';

interface TransferTabsProps {
  user: User;
  accounts: Account[];
}

export const TransferTabs = ({ user, accounts }: TransferTabsProps) => {
  const [method, setMethod] = useState<'gpay' | 'bank'>('gpay');

  return (
    <div className="w-full space-y-6">
      {/* Primary Method Switcher Header */}
      <div className="flex p-1.5 rounded-2xl bg-gray-100/90 border border-gray-200/80 max-w-[540px]">
        <button
          type="button"
          onClick={() => setMethod('gpay')}
          className={`flex flex-1 items-center justify-center gap-2.5 py-3 rounded-xl text-14 font-bold transition-all duration-200 ${
            method === 'gpay'
              ? 'bg-white text-gray-900 shadow-md'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          {/* GPay G Icon */}
          <svg className="size-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Google Pay & UPI Instant</span>
        </button>

        <button
          type="button"
          onClick={() => setMethod('bank')}
          className={`flex flex-1 items-center justify-center gap-2 py-3 rounded-xl text-14 font-bold transition-all duration-200 ${
            method === 'bank'
              ? 'bg-white text-gray-900 shadow-md'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Building2 size={17} className={method === 'bank' ? 'text-blue-600' : ''} />
          <span>Bank ACH Transfer</span>
        </button>
      </div>

      {/* Render Active Transfer Method */}
      {method === 'gpay' ? (
        <GooglePayTransfer user={user} accounts={accounts} />
      ) : (
        <div className="space-y-4">
          {accounts.length > 0 ? (
            <PaymentTransferForm accounts={accounts} />
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500 bg-white">
              <p className="text-16 font-medium text-gray-700">No bank accounts available for wire transfer.</p>
              <p className="text-14 text-gray-500 mt-1">
                Please connect at least one bank account from the sidebar or use Google Pay / UPI Instant above.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TransferTabs;
