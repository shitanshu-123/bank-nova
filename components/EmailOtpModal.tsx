'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  MailCheck,
  ShieldCheck,
  Loader2,
  AlertCircle,
  RefreshCw,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { verifyEmailOtp } from '@/lib/actions/user.actions';

interface EmailOtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerifySuccess: (otp: string) => void;
  onResendOtp?: () => Promise<void>;
}

export const EmailOtpModal = ({
  isOpen,
  onClose,
  email,
  onVerifySuccess,
  onResendOtp,
}: EmailOtpModalProps) => {
  // Pre-fill with demo OTP 123456 for effortless registration
  const [otp, setOtp] = useState<string[]>(['1', '2', '3', '4', '5', '6']);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setOtp(['1', '2', '3', '4', '5', '6']);
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

  const handleAutoFill = () => {
    setOtp(['1', '2', '3', '4', '5', '6']);
    setErrorMessage('');
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
      const verifyRes = await verifyEmailOtp({
        email,
        otp: fullOtp,
      });

      if (verifyRes?.error) {
        setErrorMessage(verifyRes.error);
        setIsLoading(false);
        return;
      }

      onVerifySuccess(fullOtp);
    } catch (err: any) {
      console.error('OTP verification error:', err);
      setErrorMessage('Verification failed. Please check the code or request a new one.');
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setCanResend(false);
    setCountdown(30);
    setErrorMessage('');
    setOtp(['1', '2', '3', '4', '5', '6']);

    if (onResendOtp) {
      await onResendOtp();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[440px] p-6 bg-paperRaised rounded-[14px] border border-line shadow-2xl">
        <DialogHeader className="text-center space-y-2">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-paper text-ink shadow-sm border border-line">
            <MailCheck size={30} color="#B8863B" />
          </div>
          <DialogTitle className="bn-serif text-22 font-medium text-text">
            Verify Your Email Address
          </DialogTitle>
          <p className="text-13 text-textMuted">
            We sent a verification code to{' '}
            <span className="font-semibold text-text">{email || 'your email'}</span>
          </p>
        </DialogHeader>

        {/* Demo Code Auto-Fill Banner */}
        <div className="flex items-center justify-between rounded-lg border border-gold/40 bg-goldSoft/30 px-3.5 py-2 text-[12.5px] text-ink shadow-sm mt-1">
          <div className="flex items-center gap-2">
            <Sparkles size={15} className="text-gold shrink-0" />
            <span>Demo code: <strong className="font-mono text-[14px] font-bold text-ink">123456</strong></span>
          </div>
          <button
            type="button"
            onClick={handleAutoFill}
            className="text-[11.5px] font-semibold text-ink hover:text-gold underline cursor-pointer bg-paperRaised px-2 py-0.5 rounded border border-line"
          >
            Auto-Fill
          </button>
        </div>

        <form onSubmit={handleVerify} className="space-y-4 pt-2">
          {errorMessage && (
            <div className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-13 font-medium text-red-700">
              <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
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
                className="size-11 sm:size-12 text-center text-20 font-bold rounded-lg border border-line bg-paper text-text transition-all focus:border-gold focus:bg-white focus:outline-none"
              />
            ))}
          </div>

          {/* Resend Code Countdown */}
          <div className="text-center text-13">
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                className="inline-flex items-center gap-1.5 font-semibold text-gold hover:text-ink transition-colors"
              >
                <RefreshCw size={14} />
                <span>Resend Verification Code</span>
              </button>
            ) : (
              <span className="text-textMuted text-[12.5px]">
                Didn&apos;t receive code? Resend in{' '}
                <span className="font-semibold text-text font-mono">
                  {countdown}s
                </span>
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2">
            <button
              type="submit"
              disabled={isLoading || otp.join('').length < 6}
              className="bn-btn-gold w-full h-11 rounded-md font-semibold text-14 text-ink shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <span>Verify & Proceed</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="w-full h-9 rounded-md text-13 font-medium text-textMuted hover:text-text"
            >
              Cancel
            </Button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-textMuted">
            <ShieldCheck size={13} color="#B8863B" />
            <span>256-Bit Encrypted Verification</span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailOtpModal;
