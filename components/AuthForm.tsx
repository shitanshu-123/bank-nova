'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import {
  Loader2,
  Mail,
  Lock,
  User as UserIcon,
  MapPin,
  Calendar,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Building,
  Hash,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '@/lib/actions/user.actions';
import PlaidLink from './PlaidLink';
import ForgotPasswordModal from './ForgotPasswordModal';

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      ...(type === 'sign-up'
        ? {
            firstName: '',
            lastName: '',
            address1: '',
            city: '',
            state: '',
            postalCode: '',
            dateOfBirth: '',
            ssn: '',
          }
        : {}),
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      if (type === 'sign-up') {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password,
        };

        const newUser = await signUp(userData);

        if (newUser?.error) {
          setErrorMessage(newUser.error);
        } else if (newUser) {
          setUser(newUser);
        }
      }

      if (type === 'sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        if (response?.error) {
          setErrorMessage(response.error);
        } else if (response) {
          router.push('/');
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form-container">
      {/* Brand Header */}
      <header className="flex flex-col gap-6">
        <Link href="/" className="flex items-center gap-2.5 group w-fit">
          <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/icons/logo.svg"
              width={28}
              height={28}
              alt="Bank Nova logo"
              className="size-7"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-ibm-plex-serif text-22 font-bold tracking-tight text-gray-900">
              Bank Nova
            </span>
            <span className="text-[11px] font-medium tracking-wide uppercase text-blue-600">
              Next-Gen Banking
            </span>
          </div>
        </Link>

        {/* Tab Switcher */}
        {!user && (
          <div className="flex p-1 rounded-xl bg-gray-100/80 border border-gray-200/70">
            <Link
              href="/sign-in"
              className={`flex-1 py-2 text-center text-14 font-medium rounded-lg transition-all duration-200 ${
                type === 'sign-in'
                  ? 'bg-white text-gray-900 shadow-sm font-semibold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className={`flex-1 py-2 text-center text-14 font-medium rounded-lg transition-all duration-200 ${
                type === 'sign-up'
                  ? 'bg-white text-gray-900 shadow-sm font-semibold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Create Account
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <h1 className="text-24 lg:text-30 font-bold tracking-tight text-gray-900">
            {user
              ? 'Link Bank Account'
              : type === 'sign-in'
              ? 'Welcome back'
              : 'Open your account'}
          </h1>
          <p className="text-14 text-gray-500">
            {user
              ? 'Connect your financial accounts with Plaid to start managing money.'
              : type === 'sign-in'
              ? 'Enter your credentials to access your secure banking dashboard.'
              : 'Join thousands of users experiencing seamless modern banking.'}
          </p>
        </div>
      </header>

      {/* Main Flow Content */}
      {user ? (
        <div className="flex flex-col gap-5 py-4">
          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
              <ShieldCheck size={26} />
            </div>
            <h3 className="mt-3 text-16 font-semibold text-gray-900">
              Account Created Successfully
            </h3>
            <p className="mt-1 text-13 text-gray-600">
              Please link at least one bank account to activate transfers and view real-time balances.
            </p>
          </div>
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Error Notification Banner */}
            {errorMessage && (
              <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/90 p-4 text-red-700 shadow-sm animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-500" />
                <div className="flex-1 text-13 font-medium leading-5">
                  {errorMessage}
                </div>
              </div>
            )}

            {/* Sign Up Fields - Structured in Logical Sections */}
            {type === 'sign-up' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-12 font-semibold uppercase tracking-wider text-blue-600">
                    Personal Details
                  </span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <CustomInput
                    control={form.control}
                    name="firstName"
                    label="First Name"
                    placeholder="Jane"
                    icon={UserIcon}
                  />
                  <CustomInput
                    control={form.control}
                    name="lastName"
                    label="Last Name"
                    placeholder="Doe"
                    icon={UserIcon}
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <span className="text-12 font-semibold uppercase tracking-wider text-blue-600">
                    Address Information
                  </span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                <CustomInput
                  control={form.control}
                  name="address1"
                  label="Street Address"
                  placeholder="123 Financial Ave, Suite 400"
                  icon={MapPin}
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="sm:col-span-1">
                    <CustomInput
                      control={form.control}
                      name="city"
                      label="City"
                      placeholder="e.g. Mumbai"
                      icon={Building}
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="e.g. Maharashtra"
                      icon={MapPin}
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="PIN / ZIP Code"
                      placeholder="e.g. 400001"
                      icon={Hash}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <span className="text-12 font-semibold uppercase tracking-wider text-blue-600">
                    Identity & Security
                  </span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <CustomInput
                    control={form.control}
                    name="dateOfBirth"
                    label="Date of Birth"
                    placeholder="YYYY-MM-DD"
                    icon={Calendar}
                  />
                  <CustomInput
                    control={form.control}
                    name="ssn"
                    label="PAN / Aadhaar / SSN"
                    placeholder="e.g. ABCDE1234F"
                    icon={Hash}
                  />
                </div>
              </div>
            )}

            {/* Email & Password */}
            <div className="space-y-3.5 pt-1">
              <CustomInput
                control={form.control}
                name="email"
                label="Email Address"
                placeholder="name@example.com"
                icon={Mail}
              />

              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Minimum 8 characters"
                icon={Lock}
              />
            </div>

            {/* Remember Me / Forgot Password for Sign In */}
            {type === 'sign-in' && (
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-13 text-gray-600">Remember this device</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-13 font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full auth-submit-btn group"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin mr-2" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {type === 'sign-in' ? 'Sign In to Dashboard' : 'Create Bank Nova Account'}
                    </span>
                    <ArrowRight
                      size={18}
                      className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </>
                )}
              </Button>
            </div>

            {/* Security Footer Note */}
            <div className="flex items-center justify-center gap-1.5 pt-2 text-center text-12 text-gray-400">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>256-bit encryption • FDIC partner insured • Plaid verified</span>
            </div>
          </form>
        </Form>
      )}

      {/* Switch Form Footer */}
      {!user && (
        <footer className="flex items-center justify-center gap-1.5 border-t border-gray-100 pt-6 text-center">
          <p className="text-14 text-gray-500">
            {type === 'sign-in' ? "Don't have an account?" : 'Already have an account?'}
          </p>
          <Link
            href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
            className="text-14 font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            {type === 'sign-in' ? 'Create an account' : 'Sign in'}
          </Link>
        </footer>
      )}

      {/* Password Reset Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        defaultEmail={form.getValues('email')}
      />
    </section>
  );
};

export default AuthForm;