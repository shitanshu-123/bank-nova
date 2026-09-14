'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Building2,
  ShieldCheck,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  CreditCard,
  QrCode,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createIndianBankAccount } from '@/lib/actions/user.actions';

interface IndianBankLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

const POPULAR_INDIAN_BANKS = [
  { name: 'State Bank of India (SBI)', code: 'SBIN', icon: '🏦' },
  { name: 'HDFC Bank', code: 'HDFC', icon: '💳' },
  { name: 'ICICI Bank', code: 'ICIC', icon: '🏛️' },
  { name: 'Axis Bank', code: 'UTIB', icon: '🏢' },
  { name: 'Kotak Mahindra Bank', code: 'KKBK', icon: '💼' },
  { name: 'Punjab National Bank (PNB)', code: 'PUNB', icon: '🏦' },
  { name: 'Bank of Baroda', code: 'BARB', icon: '🏛️' },
  { name: 'Canara Bank', code: 'CNRB', icon: '🏦' },
];

export const IndianBankLinkModal = ({
  isOpen,
  onClose,
  user,
}: IndianBankLinkModalProps) => {
  const router = useRouter();
  const [method, setMethod] = useState<'account' | 'upi'>('account');
  const [selectedBank, setSelectedBank] = useState(POPULAR_INDIAN_BANKS[0].name);
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('SBIN0001234');
  const [upiId, setUpiId] = useState('');
  const [accountHolderName, setAccountHolderName] = useState(
    user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : ''
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (method === 'account') {
      if (!accountNumber || accountNumber.length < 8 || accountNumber.length > 18) {
        setErrorMessage('Please enter a valid Indian Bank Account Number (8 to 18 digits).');
        return;
      }
      if (accountNumber !== confirmAccountNumber) {
        setErrorMessage('Account numbers do not match. Please check and re-enter.');
        return;
      }
      if (!ifscCode || ifscCode.length !== 11) {
        setErrorMessage('Please enter a valid 11-character IFSC code (e.g. SBIN0001234, HDFC0001234).');
        return;
      }
    } else {
      if (!upiId || !upiId.includes('@')) {
        setErrorMessage('Please enter a valid UPI ID (e.g. name@okhdfcbank, name@oksbi).');
        return;
      }
    }

    setIsLoading(true);

    try {
      const res = await createIndianBankAccount({
        userId: user?.$id || user?.userId,
        bankName: method === 'account' ? selectedBank : `UPI - ${upiId.split('@')[1]?.toUpperCase() || 'Bank'}`,
        accountNumber: method === 'account' ? accountNumber : upiId,
        ifscCode: method === 'account' ? ifscCode.toUpperCase() : 'UPI0000001',
      });

      if (res?.error) {
        setErrorMessage(res.error);
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        router.push('/');
        router.refresh();
      }, 1200);
    } catch (err: any) {
      console.error('Error linking Indian bank:', err);
      setErrorMessage('Failed to link Indian bank account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] p-6 bg-white rounded-3xl border border-gray-100 shadow-2xl">
        <DialogHeader className="text-center space-y-1.5">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100">
            <Building2 size={30} />
          </div>
          <DialogTitle className="text-20 font-bold text-gray-900">
            Link Indian Bank Account
          </DialogTitle>
          <p className="text-13 text-gray-500">
            Connect via Indian Bank Account / IFSC or Instant UPI ID
          </p>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-bounce">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-18 font-bold text-gray-900">Bank Account Linked!</h3>
            <p className="text-13 text-gray-500">Redirecting to your dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {errorMessage && (
              <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-13 font-medium text-red-700">
                <AlertCircle size={17} className="text-red-500 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Switch between Bank Account & UPI */}
            <div className="flex p-1 rounded-xl bg-gray-100/90 border border-gray-200">
              <button
                type="button"
                onClick={() => setMethod('account')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-13 font-semibold rounded-lg transition-all ${
                  method === 'account'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <CreditCard size={15} />
                <span>Bank Account + IFSC</span>
              </button>
              <button
                type="button"
                onClick={() => setMethod('upi')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-13 font-semibold rounded-lg transition-all ${
                  method === 'upi'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <QrCode size={15} />
                <span>Instant UPI ID</span>
              </button>
            </div>

            {method === 'account' ? (
              <div className="space-y-3.5">
                <div>
                  <label className="text-12 font-medium text-gray-700 mb-1 block">
                    Select Bank
                  </label>
                  <select
                    value={selectedBank}
                    onChange={(e) => {
                      setSelectedBank(e.target.value);
                      const matched = POPULAR_INDIAN_BANKS.find((b) => b.name === e.target.value);
                      if (matched) {
                        setIfscCode(`${matched.code}0001234`);
                      }
                    }}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-14 font-medium text-gray-900 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                  >
                    {POPULAR_INDIAN_BANKS.map((bank) => (
                      <option key={bank.code} value={bank.name}>
                        {bank.icon} {bank.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-12 font-medium text-gray-700 mb-1 block">
                    Account Holder Name
                  </label>
                  <Input
                    type="text"
                    value={accountHolderName}
                    onChange={(e) => setAccountHolderName(e.target.value)}
                    placeholder="e.g. Jane Doe"
                    className="h-11 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-12 font-medium text-gray-700 mb-1 block">
                      Account Number
                    </label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 50100412345678"
                      className="h-11 rounded-xl"
                      maxLength={18}
                    />
                  </div>
                  <div>
                    <label className="text-12 font-medium text-gray-700 mb-1 block">
                      Re-Enter Account Number
                    </label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      value={confirmAccountNumber}
                      onChange={(e) => setConfirmAccountNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="Re-enter account number"
                      className="h-11 rounded-xl"
                      maxLength={18}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-12 font-medium text-gray-700 mb-1 block">
                    IFSC Code (11 Characters)
                  </label>
                  <Input
                    type="text"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                    placeholder="e.g. SBIN0001234"
                    className="h-11 rounded-xl uppercase font-mono"
                    maxLength={11}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3.5">
                <div>
                  <label className="text-12 font-medium text-gray-700 mb-1 block">
                    Virtual Payment Address (UPI ID)
                  </label>
                  <Input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value.toLowerCase())}
                    placeholder="e.g. yourname@okhdfcbank or 9876543210@paytm"
                    className="h-11 rounded-xl"
                  />
                  <p className="text-11 text-gray-400 mt-1">
                    Supports Google Pay, PhonePe, Paytm, BHIM, and bank UPI IDs.
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 space-y-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-semibold text-14 text-white shadow-md shadow-emerald-600/20 group disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin mr-2" />
                    Connecting Indian Bank...
                  </>
                ) : (
                  <>
                    <span>Link & Activate Account</span>
                    <ArrowRight
                      size={17}
                      className="ml-2 transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="w-full h-10 rounded-xl text-13 font-medium text-gray-500 hover:text-gray-900"
              >
                Cancel
              </Button>
            </div>

            <div className="flex items-center justify-center gap-1.5 pt-1 text-center text-11 text-gray-400">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>NPCI & RBI Compliant Instant Account Verification</span>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default IndianBankLinkModal;
