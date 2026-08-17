'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Lock, Heart, ArrowUpRight } from 'lucide-react';

export const SiteFooter = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white/80 backdrop-blur-md px-6 py-8 md:px-10 mt-auto">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Col 1: Brand */}
          <div className="flex flex-col gap-3 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <div className="flex size-9 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 shadow-sm">
                <Image
                  src="/icons/logo.svg"
                  width={24}
                  height={24}
                  alt="Bank Nova logo"
                  className="size-6"
                />
              </div>
              <span className="font-ibm-plex-serif text-20 font-bold tracking-tight text-gray-900">
                Bank Nova
              </span>
            </Link>
            <p className="text-13 text-gray-500 max-w-md leading-relaxed">
              Next-generation modern financial platform featuring Google Pay & UPI transfers, multi-bank aggregation, real-time analytics, and bank-grade 256-bit security.
            </p>
          </div>

          {/* Col 2: Features */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-13 font-bold uppercase tracking-wider text-gray-900">
              Services
            </h4>
            <div className="flex flex-col gap-2 text-13 text-gray-600">
              <Link href="/payment-transfer" className="hover:text-blue-600 transition-colors">
                Google Pay & UPI Hub
              </Link>
              <Link href="/my-banks" className="hover:text-blue-600 transition-colors">
                Connected Banks
              </Link>
              <Link href="/transaction-history" className="hover:text-blue-600 transition-colors">
                Transaction History
              </Link>
            </div>
          </div>

          {/* Col 3: Security */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-13 font-bold uppercase tracking-wider text-gray-900">
              Security & Compliance
            </h4>
            <div className="flex flex-col gap-2 text-13 text-gray-600">
              <div className="flex items-center gap-1.5 text-emerald-700">
                <ShieldCheck size={16} className="shrink-0 text-emerald-600" />
                <span>256-Bit Bank Encryption</span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-700">
                <Lock size={15} className="shrink-0 text-blue-600" />
                <span>UPI & NPCI Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-6 text-12 text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} Bank Nova by Shitanshu Patel. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/shitanshu-123/bank-nova"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span>GitHub Repository</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
