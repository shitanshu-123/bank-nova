'use client';

import React, { useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Landmark,
  Receipt,
  Smartphone,
  Menu,
  LogOut,
  Plus,
} from "lucide-react";
import IndianBankLinkModal from "./IndianBankLinkModal";
import { logoutAccount } from "@/lib/actions/user.actions";

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', route: '/', icon: Home },
  { id: 'accounts', label: 'Accounts', route: '/my-banks', icon: Landmark },
  { id: 'history', label: 'History', route: '/transaction-history', icon: Receipt },
  { id: 'transfer', label: 'Transfer & UPI', route: '/payment-transfer', icon: Smartphone },
];

const MobileNav = ({ user }: MobileNavProps) => {
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
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <button
            className="flex items-center justify-center p-2 rounded-lg text-textOnInk hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Open navigation menu"
          >
            <Menu size={22} color="#EFEEE3" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="border-none p-0 flex flex-col justify-between" style={{ background: '#0E2A21', width: '280px' }}>
          <div>
            {/* Brand Logo & Monogram */}
            <div className="flex items-center gap-3 px-6 pt-7 pb-6">
              <div
                className="flex items-center justify-center bn-serif"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: '#B8863B',
                  color: '#0E2A21',
                  fontWeight: 600,
                  fontSize: '16px',
                }}
              >
                N
              </div>
              <span className="bn-serif text-textOnInk text-[17px] font-medium tracking-[0.2px]">
                Bank Nova
              </span>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(239,238,227,0.12)', margin: '0 24px 16px' }} />

            {/* Nav items */}
            <nav className="flex flex-col gap-1 px-4">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.route === '/'
                    ? pathname === '/'
                    : pathname === item.route || pathname.startsWith(`${item.route}/`);
                const Icon = item.icon;

                return (
                  <SheetClose asChild key={item.id}>
                    <Link
                      href={item.route}
                      className="bn-nav-btn flex items-center gap-3 w-full"
                      style={{
                        background: isActive ? 'rgba(184,134,59,0.16)' : 'transparent',
                        borderLeft: isActive ? '2px solid #B8863B' : '2px solid transparent',
                        padding: '11px 14px',
                        borderRadius: '4px',
                        textAlign: 'left',
                        textDecoration: 'none',
                      }}
                    >
                      <Icon size={18} color={isActive ? '#B8863B' : '#9AAA9F'} strokeWidth={1.8} />
                      <span
                        style={{
                          color: isActive ? '#EFEEE3' : '#9AAA9F',
                          fontSize: '14.5px',
                          fontWeight: isActive ? 500 : 400,
                        }}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </SheetClose>
                );
              })}
            </nav>

            {/* Connect Bank Button */}
            <div className="px-4 pt-4">
              <SheetClose asChild>
                <button
                  onClick={() => setIsBankModalOpen(true)}
                  className="bn-nav-btn flex items-center justify-center gap-2.5 w-full hover:bg-white/5 transition-colors"
                  style={{
                    background: 'transparent',
                    border: '1px solid #2A4A3D',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  <Plus size={16} color="#B8863B" strokeWidth={2.2} />
                  <span style={{ color: '#EFEEE3', fontSize: '13.5px', fontWeight: 500 }}>
                    Connect bank
                  </span>
                </button>
              </SheetClose>
            </div>
          </div>

          {/* User Footer */}
          <div className="px-4 pb-8">
            <div style={{ height: '1px', background: 'rgba(239,238,227,0.12)', margin: '0 10px 14px' }} />
            <div className="truncate px-3.5 pb-1 text-[13px] font-medium text-textOnInk">
              {displayName}
            </div>
            <div className="truncate px-3.5 pb-3 text-[11.5px] text-textOnInkMuted">
              {userEmail}
            </div>
            <button
              onClick={handleSignOut}
              className="bn-nav-btn flex items-center gap-2.5 w-full hover:bg-white/5 px-3.5 py-2 rounded-md transition-colors"
            >
              <LogOut size={15} color="#9AAA9F" strokeWidth={1.8} />
              <span style={{ color: '#9AAA9F', fontSize: '13px' }}>Sign out</span>
            </button>
          </div>
        </SheetContent>
      </Sheet>

      <IndianBankLinkModal
        isOpen={isBankModalOpen}
        onClose={() => setIsBankModalOpen(false)}
        user={user}
      />
    </section>
  );
};

export default MobileNav;