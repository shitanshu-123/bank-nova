'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  MailCheck,
  ShieldCheck,
  Loader2,
  AlertCircle,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface EmailOtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerifySuccess: (otp: string) => void;
  onResendOtp?: () => Promise<void>;
  generatedDemoOtp?: string;
}

export const EmailOtpModal = ({
  isOpen,
  onClose,
  email,
  onVerifySuccess,
  onResendOtp,
  generatedDemoOtp,
}: EmailOtpModalProps) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setOtp(['', '', '', '', '', '']);
      setErrorMessage('');
      setCountdown(30);
      setCanResend(false);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Countdown timer for resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [isOpen, countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    // Handle paste of full 6-digit code
    if (value.length > 1) {
      const pastedDigits = value.slice(0, 6).split('');
      pastedDigits.forEach((digit, i) => {
        if (i < 6) newOtp[i] = digit;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(pastedDigits.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);
    setErrorMessage('');

    // Auto move to next input box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData) {
      const newOtp = [...otp];
      pastedData.split('').forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);
      const focusIdx = Math.min(pastedData.length, 5);
      inputRefs.current[focusIdx]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join('');

    if (fullOtp.length < 6) {
      setErrorMessage('Please enter the complete 6-digit verification code.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      // Validate OTP
      if (generatedDemoOtp && fullOtp !== generatedDemoOtp && fullOtp !== '123456') {
        setErrorMessage('Invalid verification code. Please check your email or enter 123456.');
        setIsLoading(false);
        return;
      }

      onVerifySuccess(fullOtp);
    } catch (err: any) {
      console.error('OTP verification error:', err);
      setErrorMessage('Verification failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setCanResend(false);
    setCountdown(30);
    setErrorMessage('');
    setOtp(['', '', '', '', '', '']);

    if (onResendOtp) {
      await onResendOtp();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[440px] p-6 bg-white rounded-3xl border border-gray-100 shadow-2xl">
        <DialogHeader className="text-center space-y-2">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100">
            <MailCheck size={30} />
          </div>
          <DialogTitle className="text-20 font-bold text-gray-900">
            Verify Your Email Address
          </DialogTitle>
          <p className="text-13 text-gray-500">
            We sent a 6-digit verification code to{' '}
            <span className="font-semibold text-gray-800">{email || 'your email'}</span>
          </p>
        </DialogHeader>

        {generatedDemoOtp && (
          <div className="rounded-xl bg-blue-50 border border-blue-200/80 p-3 text-center text-12 text-blue-700">
            <span>Demo Test OTP: </span>
            <span className="font-mono font-bold tracking-wider text-14 bg-white px-2 py-0.5 rounded border border-blue-200">
              {generatedDemoOtp}
            </span>
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-5 pt-2">
          {errorMessage && (
            <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-13 font-medium text-red-700">
              <AlertCircle size={17} className="text-red-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 6-Digit OTP Input Grid */}
          <div className="flex justify-center items-center gap-2 sm:gap-2.5">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="size-12 sm:size-13 text-center text-20 font-extrabold rounded-2xl border-2 border-gray-200 bg-gray-50/50 text-gray-900 transition-all focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:outline-none"
              />
            ))}
          </div>

          {/* Resend Code Countdown */}
          <div className="text-center text-13">
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                className="inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                <RefreshCw size={14} />
                <span>Resend Verification Code</span>
              </button>
            ) : (
              <span className="text-gray-400">
                Didn&apos;t receive code? Resend in{' '}
                <span className="font-semibold text-gray-700 font-mono">
                  {countdown}s
                </span>
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2">
            <Button
              type="submit"
              disabled={isLoading || otp.join('').length < 6}
              className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold text-14 text-white shadow-md shadow-blue-600/20 group disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin mr-2" />
                  Verifying Code...
                </>
              ) : (
                <>
                  <span>Verify & Proceed</span>
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
            <span>256-Bit Encrypted One-Time Password Verification</span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailOtpModal;
