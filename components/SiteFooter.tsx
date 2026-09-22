'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, BadgeCheck, ArrowUpRight } from 'lucide-react';

export const SiteFooter = () => {
  return (
    <footer className="w-full border-t border-line bg-paperRaised px-6 py-8 md:px-10 mt-auto">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand Col */}
          <div className="max-w-[340px]">
            <div className="flex items-center gap-2 mb-2.5">
              <div
                className="flex items-center justify-center bn-serif"
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#0E2A21',
                  color: '#B8863B',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                N
              </div>
              <span className="bn-serif text-[16px] font-medium text-text">
                Bank Nova
              </span>
            </div>
            <p className="text-[12.5px] text-textMuted leading-[1.6]">
              A modern financial dashboard for UPI transfers, multi-bank aggregation, and everyday money tracking.
            </p>
          </div>

          {/* Services Col */}
          <div>
            <div className="text-[12px] font-semibold text-text mb-2.5 uppercase tracking-wider">
              Services
            </div>
            <div className="text-[12.5px] text-textMuted leading-[2.1] flex flex-col">
              <Link href="/payment-transfer" className="hover:text-text transition-colors">
                Google Pay &amp; UPI hub
              </Link>
              <Link href="/my-banks" className="hover:text-text transition-colors">
                Connected banks
              </Link>
              <Link href="/transaction-history" className="hover:text-text transition-colors">
                Transaction history
              </Link>
            </div>
          </div>

          {/* Security Col */}
          <div>
            <div className="text-[12px] font-semibold text-text mb-2.5 uppercase tracking-wider">
              Security &amp; compliance
            </div>
            <div className="text-[12.5px] text-textMuted leading-[2.1] flex flex-col gap-1">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck size={13} color="#B8863B" />
                <span>256-bit encryption</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <BadgeCheck size={13} color="#B8863B" />
                <span>UPI &amp; NPCI certified</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-line/60 pt-5 text-[12px] text-textMuted">
          <span>© {new Date().getFullYear()} Bank Nova by Shitanshu Patel. All rights reserved.</span>
          <a
            href="https://github.com/shitanshu-123/bank-nova"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-medium text-text hover:text-gold transition-colors"
          >
            <span>GitHub repository</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
