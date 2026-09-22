'use client';

import React from 'react';
import Link from 'next/link';
import {
  QrCode,
  Smartphone,
  Building2,
  ShieldCheck,
  BadgeCheck,
} from 'lucide-react';

function GoogleMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" width="20" height="20" {...props}>
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.6H24v9h11.8c-.5 2.8-2.1 5.2-4.4 6.8v5.6h7.1c4.2-3.9 6.6-9.6 6.6-16.8z"/>
      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-7.1-5.6c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8.1 41 15.4 46 24 46z"/>
      <path fill="#FBBC05" d="M11.8 28.2c-.4-1.3-.7-2.7-.7-4.2s.2-2.9.7-4.2v-5.7H4.5C3 17.1 2 20.4 2 24s1 6.9 2.5 9.9l7.3-5.7z"/>
      <path fill="#EA4335" d="M24 10.7c3.2 0 6.1 1.1 8.3 3.3l6.3-6.3C34.9 4.2 29.9 2 24 2 15.4 2 8.1 7 4.5 14.1l7.3 5.7c1.7-5.2 6.5-9.1 12.2-9.1z"/>
    </svg>
  );
}

const QUICK_ACTIONS = [
  { id: 'gpay', label: 'Google Pay', sub: 'Instant UPI transfer', icon: GoogleMark, href: '/payment-transfer' },
  { id: 'scan', label: 'Scan & Pay', sub: 'Scan any QR code', icon: QrCode, href: '/payment-transfer' },
  { id: 'mobile', label: 'Mobile Pay', sub: 'Send to a phone number', icon: Smartphone, href: '/payment-transfer' },
  { id: 'wire', label: 'Bank Wire', sub: 'ACH & Plaid transfer', icon: Building2, href: '/payment-transfer' },
];

export const DashboardQuickActions = () => {
  return (
    <div className="w-full space-y-4">
      {/* Title */}
      <div>
        <h2 className="bn-serif text-[19px] font-medium text-text m-0">
          Move money
        </h2>
        <p className="text-[13px] text-textMuted mt-1">
          Send and receive in seconds.
        </p>
      </div>

      {/* Grid container */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 rounded-[10px] border border-line bg-paperRaised overflow-hidden shadow-sm"
      >
        {QUICK_ACTIONS.map((a, i) => {
          const Icon = a.icon;
          const isRightBorder = i % 2 === 0 || (i < 3 && i % 4 !== 3);

          return (
            <Link
              key={a.id}
              href={a.href}
              className="bn-action flex flex-col gap-2.5 p-5 md:p-6 transition-colors border-b md:border-b-0 border-line border-r last:border-r-0"
              style={{
                textDecoration: 'none',
              }}
            >
              <div className="flex size-9 items-center justify-center rounded-lg bg-paper border border-line/60">
                {a.id === 'gpay' ? (
                  <GoogleMark />
                ) : (
                  <Icon size={19} color="#0E2A21" strokeWidth={1.8} />
                )}
              </div>
              <div>
                <div className="text-[14px] font-medium text-text">
                  {a.label}
                </div>
                <div className="text-[12px] text-textMuted mt-0.5">
                  {a.sub}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Trust strip */}
      <div className="flex items-center gap-5 flex-wrap pt-1 text-[12.5px] text-textMuted">
        <span className="flex items-center gap-1.5 font-medium">
          <ShieldCheck size={14} color="#B8863B" />
          <span>256-bit encryption, NPCI-compliant</span>
        </span>
        <span className="flex items-center gap-1.5 font-medium">
          <BadgeCheck size={14} color="#B8863B" />
          <span>UPI certified</span>
        </span>
      </div>
    </div>
  );
};

export default DashboardQuickActions;
