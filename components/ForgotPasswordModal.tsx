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
import { Label } from '@/components/ui/label';
import {
  KeyRound,
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { sendPasswordResetEmail } from '@/lib/actions/user.actions';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail?: string;
}

export const ForgotPasswordModal = ({
  isOpen,
  onClose,
  defaultEmail = '',
}: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState(defaultEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Sync defaultEmail when modal opens
  React.useEffect(() => {
    if (defaultEmail) setEmail(defaultEmail);
    setErrorMessage('');
    setSuccessMessage('');
  }, [defaultEmail, isOpen]);

  const handleSendReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await sendPasswordResetEmail(email.trim());

      if (res?.error) {
        setErrorMessage(res.error);
      } else if (res?.success) {
        setSuccessMessage(res.message);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setErrorMessage('');
    setSuccessMessage('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-[440px] p-6 bg-white rounded-3xl border border-gray-100 shadow-2xl">
        <DialogHeader className="text-center space-y-2">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100">
            <KeyRound size={28} />
          </div>
          <DialogTitle className="text-20 font-bold text-gray-900">
            Reset Your Password
          </DialogTitle>
          <p className="text-13 text-gray-500">
            Enter your registered Bank Nova email address and we will send you secure password reset instructions.
          </p>
        </DialogHeader>

        {successMessage ? (
          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-emerald-800">
              <CheckCircle2 className="size-5 shrink-0 text-emerald-600 mt-0.5" />
              <div className="space-y-1 text-13">
                <p className="font-semibold text-emerald-900">Instructions Sent!</p>
                <p className="text-emerald-700 leading-5">{successMessage}</p>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleModalClose}
              className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold text-white shadow-md shadow-blue-600/20"
            >
              Back to Sign In
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSendReset} className="space-y-4 pt-2">
            {errorMessage && (
              <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-13 font-medium text-red-700">
                <AlertCircle size={17} className="text-red-500 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <Label className="text-13 font-semibold text-gray-700">
                Registered Email Address
              </Label>
              <div className="relative flex items-center">
                <div className="pointer-events-none absolute left-3.5 text-gray-400">
                  <Mail size={18} />
                </div>
                <Input
                  type="email"
                  autoFocus
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="name@example.com"
                  className="h-11 pl-10 rounded-xl border-gray-200 text-14 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold text-14 text-white shadow-md shadow-blue-600/20 group"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin mr-2" />
                    Sending Instructions...
                  </>
                ) : (
                  <>
                    <span>Send Reset Instructions</span>
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
                onClick={handleModalClose}
                className="w-full h-10 rounded-xl text-13 font-medium text-gray-500 hover:text-gray-900"
              >
                Cancel
              </Button>
            </div>

            <div className="flex items-center justify-center gap-1.5 pt-1 text-center text-11 text-gray-400">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>Protected by Bank-Grade 256-Bit Security</span>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
