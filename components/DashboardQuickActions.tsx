'use client';

import React from 'react';
import Link from 'next/link';
import {
  Zap,
  QrCode,
  ArrowUpRight,
  ArrowDownLeft,
  Building2,
  Sparkles,
  Smartphone,
  ShieldCheck,
} from 'lucide-react';

export const DashboardQuickActions = () => {
  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Zap size={16} />
          </div>
          <h3 className="text-14 font-bold text-gray-900">Quick Actions</h3>
        </div>
        <div className="flex items-center gap-1 text-11 font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
          <ShieldCheck size={12} />
          <span>NPCI 256-Bit</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Quick Action 1: Google Pay Instant */}
        <Link
          href="/payment-transfer"
          className="flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-3.5 text-center shadow-sm transition-all duration-200 hover:border-blue-500 hover:shadow-md hover:scale-[1.02] group"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-white shadow-sm border border-gray-200 p-1.5 group-hover:bg-blue-50 transition-colors">
            <svg className="size-6" viewBox="0 0 24 24">
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
          </div>
          <div>
            <p className="text-13 font-bold text-gray-900">Google Pay</p>
            <p className="text-11 text-gray-500">Instant UPI VPA</p>
          </div>
        </Link>

        {/* Quick Action 2: Scan & Pay QR */}
        <Link
          href="/payment-transfer"
          className="flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-3.5 text-center shadow-sm transition-all duration-200 hover:border-blue-500 hover:shadow-md hover:scale-[1.02] group"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <QrCode size={20} />
          </div>
          <div>
            <p className="text-13 font-bold text-gray-900">Scan & Pay</p>
            <p className="text-11 text-gray-500">Dynamic QR Code</p>
          </div>
        </Link>

        {/* Quick Action 3: Mobile Transfer */}
        <Link
          href="/payment-transfer"
          className="flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-3.5 text-center shadow-sm transition-all duration-200 hover:border-blue-500 hover:shadow-md hover:scale-[1.02] group"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <Smartphone size={20} />
          </div>
          <div>
            <p className="text-13 font-bold text-gray-900">Mobile Pay</p>
            <p className="text-11 text-gray-500">Phone to Phone</p>
          </div>
        </Link>

        {/* Quick Action 4: Bank Wire */}
        <Link
          href="/payment-transfer"
          className="flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-3.5 text-center shadow-sm transition-all duration-200 hover:border-blue-500 hover:shadow-md hover:scale-[1.02] group"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 shadow-sm border border-purple-100 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <Building2 size={20} />
          </div>
          <div>
            <p className="text-13 font-bold text-gray-900">Bank Wire</p>
            <p className="text-11 text-gray-500">ACH & Plaid Transfer</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DashboardQuickActions;
