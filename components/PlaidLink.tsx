'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import IndianBankLinkModal from './IndianBankLinkModal';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {variant === 'primary' ? (
        <Button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="plaidlink-primary"
        >
          Connect Indian Bank 🇮🇳
        </Button>
      ) : variant === 'ghost' ? (
        <Button
          type="button"
          onClick={() => setIsModalOpen(true)}
          variant="ghost"
          className="plaidlink-ghost"
        >
          <Image
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className="hidden text-[16px] font-semibold text-black-2 xl:block">
            Connect bank
          </p>
        </Button>
      ) : (
        <Button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="plaidlink-default"
        >
          <Image
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className="text-[16px] font-semibold text-black-2">Connect bank</p>
        </Button>
      )}

      {/* Indian Bank Link Modal (+91 Phone, Account, UPI) */}
      <IndianBankLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </>
  );
};

export default PlaidLink;