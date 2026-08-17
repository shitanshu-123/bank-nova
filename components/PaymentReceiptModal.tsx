'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  Download,
  Printer,
  Copy,
  Check,
  Share2,
  ShieldCheck,
  Building,
  ArrowRight,
} from 'lucide-react';
import Image from 'next/image';

interface PaymentReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionData: {
    utr: string;
    amount: number;
    recipientName: string;
    recipientVpa: string;
    senderAccount: string;
    timestamp: string;
    note?: string;
    paymentMethod?: string;
  } | null;
}

export const PaymentReceiptModal = ({
  isOpen,
  onClose,
  transactionData,
}: PaymentReceiptModalProps) => {
  const [copied, setCopied] = React.useState(false);

  if (!transactionData) return null;

  const handleCopyUtr = () => {
    navigator.clipboard.writeText(transactionData.utr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden bg-white border border-gray-100 rounded-3xl shadow-2xl">
        {/* Receipt Header Banner */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white text-center relative">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg animate-in zoom-in-95">
            <CheckCircle2 size={36} className="text-white" />
          </div>
          <h2 className="mt-3 text-20 font-bold tracking-tight">Payment Successful!</h2>
          <p className="text-13 text-emerald-100 mt-0.5">
            Transferred via {transactionData.paymentMethod || 'Google Pay / UPI'}
          </p>

          <div className="mt-4 inline-flex items-baseline gap-1 rounded-2xl bg-white/15 px-4 py-2 backdrop-blur-md border border-white/20">
            <span className="text-14 font-medium text-emerald-100">₹</span>
            <span className="text-28 font-extrabold tracking-tight text-white">
              {transactionData.amount.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>

        {/* Receipt Body */}
        <div className="p-6 space-y-4 text-gray-800">
          <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 space-y-3">
            {/* Recipient Details */}
            <div className="flex items-center justify-between">
              <span className="text-12 font-medium text-gray-500 uppercase tracking-wider">
                Paid To
              </span>
              <div className="text-right">
                <p className="text-14 font-semibold text-gray-900">
                  {transactionData.recipientName}
                </p>
                <p className="text-12 text-blue-600 font-mono">
                  {transactionData.recipientVpa}
                </p>
              </div>
            </div>

            <div className="h-px bg-gray-200/80" />

            {/* Sender Account */}
            <div className="flex items-center justify-between">
              <span className="text-12 font-medium text-gray-500 uppercase tracking-wider">
                Debited From
              </span>
              <div className="text-right">
                <p className="text-13 font-semibold text-gray-800">
                  {transactionData.senderAccount}
                </p>
                <span className="inline-flex items-center gap-1 text-11 text-emerald-600 font-medium">
                  <CheckCircle2 size={12} /> Instant Settlement
                </span>
              </div>
            </div>

            <div className="h-px bg-gray-200/80" />

            {/* UTR / Reference */}
            <div className="flex items-center justify-between">
              <span className="text-12 font-medium text-gray-500 uppercase tracking-wider">
                UPI Ref / UTR
              </span>
              <button
                onClick={handleCopyUtr}
                className="inline-flex items-center gap-1.5 font-mono text-12 font-semibold text-gray-700 bg-white px-2 py-1 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                title="Click to copy UTR"
              >
                <span>{transactionData.utr}</span>
                {copied ? (
                  <Check size={13} className="text-emerald-600" />
                ) : (
                  <Copy size={13} className="text-gray-400" />
                )}
              </button>
            </div>

            <div className="h-px bg-gray-200/80" />

            {/* Timestamp */}
            <div className="flex items-center justify-between">
              <span className="text-12 font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </span>
              <span className="text-13 font-medium text-gray-700">
                {transactionData.timestamp}
              </span>
            </div>

            {transactionData.note && (
              <>
                <div className="h-px bg-gray-200/80" />
                <div className="flex items-center justify-between">
                  <span className="text-12 font-medium text-gray-500 uppercase tracking-wider">
                    Note / Remark
                  </span>
                  <span className="text-13 font-medium text-gray-700 italic">
                    &ldquo;{transactionData.note}&rdquo;
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Security Seal */}
          <div className="flex items-center justify-center gap-1.5 text-center text-11 text-gray-400">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>NPCI / UPI 256-Bit Encrypted Transaction • Bank Nova Verified</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2.5 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrint}
              className="flex-1 rounded-xl border-gray-200 text-13 font-medium text-gray-700 hover:bg-gray-50"
            >
              <Printer size={15} className="mr-1.5" />
              Print Receipt
            </Button>
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-13 font-semibold text-white shadow-md shadow-blue-600/20"
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentReceiptModal;
