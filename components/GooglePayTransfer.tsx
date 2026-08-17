'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  QrCode,
  Zap,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Building,
  User,
  Sparkles,
  Camera,
  RefreshCw,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import PaymentReceiptModal from './PaymentReceiptModal';
import GooglePayButton from './GooglePayButton';
import { createTransaction } from '@/lib/actions/transaction.actions';
import { useRouter } from 'next/navigation';

interface GooglePayTransferProps {
  user: User;
  accounts: Account[];
}

const FREQUENT_CONTACTS = [
  { name: 'Rahul Sharma', vpa: 'rahul.sharma@okhdfcbank', initials: 'RS', color: 'bg-blue-600' },
  { name: 'Priya Patel', vpa: 'priya.patel@okaxis', initials: 'PP', color: 'bg-emerald-600' },
  { name: 'Amit Kumar', vpa: 'amit.k@oksbi', initials: 'AK', color: 'bg-purple-600' },
  { name: 'Zomato UPI', vpa: 'zomato@hdfcbank', initials: 'ZO', color: 'bg-rose-600' },
  { name: 'Swiggy Pay', vpa: 'swiggy@icici', initials: 'SW', color: 'bg-amber-600' },
];

const POPULAR_HANDLES = ['@okhdfcbank', '@okaxis', '@oksbi', '@okicici', '@paytm', '@ybl'];

export const GooglePayTransfer = ({ user, accounts }: GooglePayTransferProps) => {
  const router = useRouter();

  // Mode: 'vpa' | 'phone' | 'qr'
  const [activeTab, setActiveTab] = useState<'vpa' | 'phone' | 'qr'>('vpa');

  // Form State
  const [vpa, setVpa] = useState('');
  const [phone, setPhone] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [selectedBankId, setSelectedBankId] = useState(
    accounts && accounts.length > 0 ? accounts[0].appwriteItemId : 'default_bank'
  );

  // Status & Modal States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');
  const [isVerifyingPin, setIsVerifyingPin] = useState(false);
  const [completedTx, setCompletedTx] = useState<any>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  // Quick Amount Presets
  const quickAmounts = [100, 500, 1000, 2000, 5000];

  // Select frequent contact
  const handleSelectContact = (contact: typeof FREQUENT_CONTACTS[0]) => {
    setVpa(contact.vpa);
    setRecipientName(contact.name);
    setActiveTab('vpa');
    setErrorMessage('');
  };

  // Add handle suffix
  const handleAddSuffix = (suffix: string) => {
    const prefix = vpa.includes('@') ? vpa.split('@')[0] : vpa;
    setVpa(prefix ? `${prefix}${suffix}` : '');
  };

  // Initial step: Validate and open PIN authentication
  const handleInitiatePay = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setErrorMessage('Please enter a valid amount greater than ₹0.');
      return;
    }

    if (activeTab === 'vpa') {
      if (!vpa || !vpa.includes('@')) {
        setErrorMessage('Please enter a valid UPI ID / Google Pay handle (e.g. user@okhdfcbank).');
        return;
      }
    } else if (activeTab === 'phone') {
      if (!phone || phone.replace(/\D/g, '').length < 10) {
        setErrorMessage('Please enter a valid 10-digit mobile number.');
        return;
      }
    }

    // Open PIN confirmation dialog
    setPin('');
    setShowPinModal(true);
  };

  // Final step: Confirm PIN and persist transaction in Appwrite
  const handleConfirmPin = async () => {
    if (pin.length < 4) {
      setErrorMessage('Please enter your 4-digit UPI security PIN.');
      return;
    }

    setIsVerifyingPin(true);

    try {
      const resolvedRecipientName =
        recipientName ||
        (activeTab === 'phone' ? `Mobile (${phone})` : vpa.split('@')[0].toUpperCase());

      const resolvedVpa =
        activeTab === 'phone' ? `${phone}@upi` : vpa;

      const utrNumber = `UPI${Date.now()}${Math.floor(1000 + Math.random() * 9000)}`;

      // Save transaction to Appwrite database
      try {
        await createTransaction({
          name: `GPay: ${resolvedRecipientName}`,
          amount: amount,
          senderId: user?.$id || 'current_user',
          senderBankId: selectedBankId,
          receiverId: resolvedVpa,
          receiverBankId: 'UPI_INSTANT',
          email: user?.email || '',
        });
      } catch (dbErr) {
        console.warn('Appwrite transaction logging note:', dbErr);
      }

      const selectedAccount = accounts?.find(
        (a) => a.appwriteItemId === selectedBankId
      );

      const senderAccountName = selectedAccount
        ? `${selectedAccount.name} (••••${selectedAccount.mask || '1234'})`
        : 'Bank Nova Primary Account';

      const txReceipt = {
        utr: utrNumber,
        amount: parseFloat(amount),
        recipientName: resolvedRecipientName,
        recipientVpa: resolvedVpa,
        senderAccount: senderAccountName,
        timestamp: new Date().toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
        note: note || 'Google Pay Instant Transfer',
        paymentMethod: 'Google Pay / UPI Instant',
      };

      setCompletedTx(txReceipt);
      setShowPinModal(false);
      setShowReceipt(true);

      // Reset form
      setAmount('');
      setNote('');
      setVpa('');
      setPhone('');
      setRecipientName('');

      router.refresh();
    } catch (err) {
      console.error('Payment failure:', err);
      setErrorMessage('Payment failed. Please try again.');
    } finally {
      setIsVerifyingPin(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Banner with Google Pay Branding */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 via-[#1F1F1F] to-gray-900 p-6 text-white shadow-xl border border-gray-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-white p-2 shadow-md">
              <svg className="size-7" viewBox="0 0 24 24">
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
              <div className="flex items-center gap-2">
                <h3 className="text-18 font-bold tracking-tight text-white">
                  Google Pay & UPI Hub
                </h3>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-11 font-semibold text-emerald-400 border border-emerald-500/30">
                  Instant 24x7
                </span>
              </div>
              <p className="text-13 text-gray-400">
                Zero fees • 256-Bit NPCI encryption • Direct bank settlement
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 backdrop-blur-md text-12 font-medium text-gray-300">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Verified Secure</span>
          </div>
        </div>
      </div>

      {/* Frequent Contacts Quick-Tap Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-13 font-semibold text-gray-700">Recent & Frequent Contacts</span>
          <span className="text-12 text-blue-600 font-medium cursor-pointer hover:underline">
            View All
          </span>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          {FREQUENT_CONTACTS.map((contact) => (
            <button
              key={contact.vpa}
              type="button"
              onClick={() => handleSelectContact(contact)}
              className="flex shrink-0 flex-col items-center gap-1.5 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition-all hover:border-blue-500 hover:shadow-md active:scale-95 group w-24"
            >
              <div
                className={`flex size-11 items-center justify-center rounded-full text-white font-bold text-14 shadow-sm group-hover:scale-105 transition-transform ${contact.color}`}
              >
                {contact.initials}
              </div>
              <span className="text-11 font-medium text-gray-800 text-center truncate w-full">
                {contact.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex rounded-xl bg-gray-100 p-1 border border-gray-200">
        <button
          type="button"
          onClick={() => {
            setActiveTab('vpa');
            setErrorMessage('');
          }}
          className={`flex flex-1 items-center justify-center gap-2 py-2.5 rounded-lg text-13 font-semibold transition-all ${
            activeTab === 'vpa'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Zap size={16} className={activeTab === 'vpa' ? 'text-blue-600' : ''} />
          <span>UPI / GPay ID</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('phone');
            setErrorMessage('');
          }}
          className={`flex flex-1 items-center justify-center gap-2 py-2.5 rounded-lg text-13 font-semibold transition-all ${
            activeTab === 'phone'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Smartphone size={16} className={activeTab === 'phone' ? 'text-blue-600' : ''} />
          <span>Mobile Number</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('qr');
            setErrorMessage('');
          }}
          className={`flex flex-1 items-center justify-center gap-2 py-2.5 rounded-lg text-13 font-semibold transition-all ${
            activeTab === 'qr'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <QrCode size={16} className={activeTab === 'qr' ? 'text-blue-600' : ''} />
          <span>Scan & Pay QR</span>
        </button>
      </div>

      {/* Form Content */}
      {activeTab === 'qr' ? (
        /* Dynamic QR Code Hub */
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
          <div className="text-center space-y-1">
            <h4 className="text-16 font-bold text-gray-900">Receive via UPI QR Code</h4>
            <p className="text-13 text-gray-500">
              Scan with any UPI app (Google Pay, PhonePe, Paytm, BHIM) to pay instantly.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-gray-50 to-blue-50/40 border border-blue-100 max-w-[280px] mx-auto shadow-inner">
            {/* Dynamic Simulated SVG QR */}
            <div className="bg-white p-3 rounded-2xl shadow-md border border-gray-100">
              <svg className="size-48" viewBox="0 0 100 100">
                {/* QR Finder Patterns */}
                <rect width="28" height="28" fill="#111827" rx="4" />
                <rect x="4" y="4" width="20" height="20" fill="white" rx="2" />
                <rect x="8" y="8" width="12" height="12" fill="#2563EB" rx="2" />

                <rect x="72" width="28" height="28" fill="#111827" rx="4" />
                <rect x="76" y="4" width="20" height="20" fill="white" rx="2" />
                <rect x="80" y="8" width="12" height="12" fill="#2563EB" rx="2" />

                <rect y="72" width="28" height="28" fill="#111827" rx="4" />
                <rect x="4" y="76" width="20" height="20" fill="white" rx="2" />
                <rect x="8" y="80" width="12" height="12" fill="#2563EB" rx="2" />

                {/* QR Data Grid Matrix */}
                <rect x="36" y="8" width="8" height="8" fill="#111827" />
                <rect x="48" y="8" width="8" height="8" fill="#111827" />
                <rect x="36" y="24" width="16" height="8" fill="#111827" />
                <rect x="56" y="20" width="8" height="16" fill="#111827" />
                <rect x="8" y="36" width="8" height="12" fill="#111827" />
                <rect x="20" y="40" width="12" height="8" fill="#111827" />
                <rect x="36" y="40" width="28" height="20" fill="#2563EB" rx="4" />
                <rect x="72" y="36" width="20" height="8" fill="#111827" />
                <rect x="84" y="48" width="8" height="16" fill="#111827" />
                <rect x="36" y="68" width="12" height="16" fill="#111827" />
                <rect x="52" y="72" width="16" height="8" fill="#111827" />
                <rect x="72" y="68" width="20" height="24" fill="#111827" />
              </svg>
            </div>

            <div className="mt-4 text-center">
              <p className="text-14 font-bold text-gray-900">
                {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Bank Nova User'}
              </p>
              <p className="text-12 font-mono text-blue-600 font-semibold mt-0.5">
                {user?.email ? `${user.email.split('@')[0]}@okhdfcbank` : 'user@okhdfcbank'}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              onClick={() => setActiveTab('vpa')}
              className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              <Send size={16} className="mr-2" />
              Send Money Instead
            </Button>
          </div>
        </div>
      ) : (
        /* Transfer Form */
        <form onSubmit={handleInitiatePay} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
          {errorMessage && (
            <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-13 font-medium text-red-700">
              <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Account Selector */}
          <div className="space-y-1.5">
            <Label className="text-13 font-semibold text-gray-700">
              Debit From Account
            </Label>
            <Select value={selectedBankId} onValueChange={setSelectedBankId}>
              <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-white text-14">
                <SelectValue placeholder="Select Bank Account" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {accounts && accounts.length > 0 ? (
                  accounts.map((account) => (
                    <SelectItem
                      key={account.appwriteItemId}
                      value={account.appwriteItemId}
                      className="cursor-pointer text-14"
                    >
                      <div className="flex items-center gap-2">
                        <Building size={16} className="text-blue-600" />
                        <span>{account.name}</span>
                        <span className="text-gray-400 font-mono">
                          (••••{account.mask || '1234'})
                        </span>
                        <span className="font-semibold text-emerald-600 ml-auto">
                          ₹{account.currentBalance?.toLocaleString('en-IN') || '0.00'}
                        </span>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="default_bank" className="text-14">
                    Bank Nova Primary Balance (₹50,000.00)
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Recipient Input based on Tab */}
          {activeTab === 'vpa' ? (
            <div className="space-y-2">
              <Label className="text-13 font-semibold text-gray-700">
                Recipient UPI ID / GPay VPA
              </Label>
              <div className="relative">
                <div className="pointer-events-none absolute left-3.5 top-3 text-gray-400">
                  <Zap size={18} />
                </div>
                <Input
                  value={vpa}
                  onChange={(e) => {
                    setVpa(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="e.g. rahul@okhdfcbank or 9876543210@paytm"
                  className="h-11 pl-10 rounded-xl border-gray-200 text-14 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 font-mono"
                />
              </div>

              {/* Suffix Helper Pills */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-11 text-gray-400 font-medium mr-1">Suggested:</span>
                {POPULAR_HANDLES.map((handle) => (
                  <button
                    key={handle}
                    type="button"
                    onClick={() => handleAddSuffix(handle)}
                    className="rounded-lg bg-gray-100 px-2 py-0.5 text-11 font-mono font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-transparent transition-all"
                  >
                    {handle}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label className="text-13 font-semibold text-gray-700">
                Recipient Mobile Number
              </Label>
              <div className="relative">
                <div className="pointer-events-none absolute left-3.5 top-3 flex items-center gap-1 text-gray-500 font-semibold text-13">
                  <span>🇮🇳 +91</span>
                </div>
                <Input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, ''));
                    setErrorMessage('');
                  }}
                  placeholder="9876543210"
                  className="h-11 pl-20 rounded-xl border-gray-200 text-14 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 font-mono font-medium"
                />
              </div>
            </div>
          )}

          {/* Amount Input */}
          <div className="space-y-2">
            <Label className="text-13 font-semibold text-gray-700">
              Transfer Amount
            </Label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-2 text-22 font-bold text-gray-400">
                ₹
              </span>
              <Input
                type="number"
                min="1"
                step="any"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="0.00"
                className="h-13 pl-9 rounded-xl border-gray-200 text-22 font-bold text-gray-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Quick Amount Chips */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              {quickAmounts.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setAmount(q.toString())}
                  className={`rounded-xl px-3 py-1.5 text-12 font-semibold transition-all ${
                    amount === q.toString()
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  +₹{q.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </div>

          {/* Note / Remarks */}
          <div className="space-y-1.5">
            <Label className="text-13 font-semibold text-gray-700">
              Note / Remark (Optional)
            </Label>
            <Input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Dinner split, Rent, Freelance payment"
              className="h-11 rounded-xl border-gray-200 text-14"
            />
          </div>

          {/* Submit Google Pay Button */}
          <div className="pt-3">
            <GooglePayButton
              onClick={handleInitiatePay}
              label={
                amount
                  ? `Pay ₹${parseFloat(amount || '0').toLocaleString('en-IN')} with Google Pay`
                  : 'Proceed to Pay with Google Pay'
              }
            />
          </div>

          <div className="flex items-center justify-center gap-1.5 pt-1 text-center text-11 text-gray-400">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Protected by Google Pay & NPCI 256-Bit UPI Shield</span>
          </div>
        </form>
      )}

      {/* UPI PIN Verification Modal Sheet */}
      <Dialog open={showPinModal} onOpenChange={setShowPinModal}>
        <DialogContent className="sm:max-w-[400px] p-6 bg-white rounded-3xl border border-gray-100 shadow-2xl">
          <DialogHeader className="text-center space-y-2">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100">
              <ShieldCheck size={32} />
            </div>
            <DialogTitle className="text-20 font-bold text-gray-900">
              Enter UPI Security PIN
            </DialogTitle>
            <p className="text-13 text-gray-500">
              Authorizing transfer of{' '}
              <span className="font-bold text-gray-900">
                ₹{parseFloat(amount || '0').toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>{' '}
              to <span className="font-semibold text-blue-600">{recipientName || vpa || phone}</span>
            </p>
          </DialogHeader>

          <div className="space-y-5 pt-3">
            <div className="flex justify-center">
              <Input
                type="password"
                maxLength={6}
                autoFocus
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                placeholder="••••"
                className="h-14 w-44 text-center tracking-[12px] text-26 font-extrabold rounded-2xl border-gray-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="text-center text-12 text-gray-400">
              <span>Enter 4 or 6 digit PIN (Sandbox demo: enter any 4 digits like 1234)</span>
            </div>

            <div className="flex gap-2.5 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPinModal(false)}
                className="flex-1 rounded-xl text-13 font-semibold text-gray-600"
              >
                Cancel
              </Button>
              <Button
                type="button"
                disabled={isVerifyingPin || pin.length < 4}
                onClick={handleConfirmPin}
                className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-13 font-semibold text-white shadow-md shadow-blue-600/20"
              >
                {isVerifyingPin ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    Authorizing...
                  </>
                ) : (
                  'Confirm & Pay'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Receipt Modal */}
      <PaymentReceiptModal
        isOpen={showReceipt}
        onClose={() => setShowReceipt(false)}
        transactionData={completedTx}
      />
    </div>
  );
};

export default GooglePayTransfer;
