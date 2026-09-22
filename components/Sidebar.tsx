'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  Landmark,
  Receipt,
  Smartphone,
  Plus,
  LogOut,
} from 'lucide-react';
import IndianBankLinkModal from './IndianBankLinkModal';
import { logoutAccount } from '@/lib/actions/user.actions';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', route: '/', icon: Home },
  { id: 'accounts', label: 'Accounts', route: '/my-banks', icon: Landmark },
  { id: 'history', label: 'History', route: '/transaction-history', icon: Receipt },
  { id: 'transfer', label: 'Transfer & UPI', route: '/payment-transfer', icon: Smartphone },
];

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);

  const handleSignOut = async () => {
    const success = await logoutAccount();
    if (success) router.push('/sign-in');
  };

  const userEmail = user?.email || 'user@banknova.com';
  const displayName = user?.firstName ? `${user.firstName} ${user?.lastName || ''}`.trim() : (user?.name || 'Account');

  return (
    <>
      <aside
        className="hidden md:flex flex-col h-screen sticky top-0 left-0 shrink-0 z-20 border-r border-inkSoft"
        style={{
          background: '#0E2A21',
          width: '240px',
        }}
      >
        {/* Brand Logo & Monogram */}
        <div className="flex items-center gap-3 px-6 pt-7 pb-6">
          <div
            className="flex items-center justify-center bn-serif"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#B8863B',
              color: '#0E2A21',
              fontWeight: 600,
              fontSize: '17px',
              boxShadow: '0 2px 8px rgba(184,134,59,0.3)',
            }}
          >
            N
          </div>
          <Link href="/" className="bn-serif text-textOnInk text-[17px] font-medium tracking-[0.2px] hover:opacity-90">
            Bank Nova
          </Link>
        </div>

        {/* Subtle Divider */}
        <div style={{ height: '1px', background: 'rgba(239,238,227,0.12)', margin: '0 24px 20px' }} />

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1.5 px-4 flex-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.route === '/'
                ? pathname === '/'
                : pathname === item.route || pathname.startsWith(`${item.route}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.route}
                className="bn-nav-btn flex items-center gap-3 w-full"
                style={{
                  background: isActive ? 'rgba(184,134,59,0.16)' : 'transparent',
                  borderLeft: isActive ? '2px solid #B8863B' : '2px solid transparent',
                  padding: '10px 14px',
                  borderRadius: '4px',
                  textAlign: 'left',
                  textDecoration: 'none',
                }}
              >
                <Icon size={17} color={isActive ? '#B8863B' : '#9AAA9F'} strokeWidth={1.8} />
                <span
                  style={{
                    color: isActive ? '#EFEEE3' : '#9AAA9F',
                    fontSize: '14px',
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Connect Bank Button */}
        <div className="px-4 pb-3">
          <button
            onClick={() => setIsBankModalOpen(true)}
            className="bn-nav-btn flex items-center justify-center gap-2.5 w-full hover:bg-white/5 transition-colors"
            style={{
              background: 'transparent',
              border: '1px solid #2A4A3D',
              padding: '10px 14px',
              borderRadius: '6px',
              cursor: 'pointer',
              marginBottom: '8px',
            }}
          >
            <Plus size={16} color="#B8863B" strokeWidth={2.2} />
            <span style={{ color: '#EFEEE3', fontSize: '13.5px', fontWeight: 500 }}>
              Connect bank
            </span>
          </button>
        </div>

        {/* Subtle Divider */}
        <div style={{ height: '1px', background: 'rgba(239,238,227,0.12)', margin: '0 24px' }} />

        {/* User Footer / Sign Out */}
        <div className="px-4 pt-3.5 pb-6">
          <div
            className="truncate"
            title={userEmail}
            style={{ padding: '0 14px 4px', fontSize: '13px', fontWeight: 500, color: '#EFEEE3' }}
          >
            {displayName}
          </div>
          <div
            className="truncate"
            title={userEmail}
            style={{ padding: '0 14px 10px', fontSize: '11.5px', color: '#9AAA9F' }}
          >
            {userEmail}
          </div>
          <button
            onClick={handleSignOut}
            className="bn-nav-btn flex items-center gap-2.5 w-full hover:bg-white/5 rounded-md transition-colors"
            style={{
              background: 'transparent',
              border: 'none',
              padding: '8px 14px',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <LogOut size={15} color="#9AAA9F" strokeWidth={1.8} />
            <span style={{ color: '#9AAA9F', fontSize: '13px' }}>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Indian Bank Link Modal */}
      <IndianBankLinkModal
        isOpen={isBankModalOpen}
        onClose={() => setIsBankModalOpen(false)}
        user={user}
      />
    </>
  );
};

export default Sidebar;