'use client';

import React, { useState } from 'react';
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Control, FieldPath } from 'react-hook-form';
import { z } from 'zod';
import { authFormSchema } from '@/lib/utils';
import { Eye, EyeOff, LucideIcon } from 'lucide-react';

const formSchema = authFormSchema('sign-up');

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  icon?: LucideIcon;
  type?: string;
  disabled?: boolean;
}

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  icon: Icon,
  type,
  disabled = false,
}: CustomInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = name === 'password' || type === 'password';

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="form-item group">
          <FormLabel className="form-label transition-colors group-focus-within:text-blue-700">
            {label}
          </FormLabel>
          <div className="relative flex w-full items-center">
            {Icon && (
              <div className="pointer-events-none absolute left-3.5 z-10 flex items-center text-gray-400 transition-colors group-focus-within:text-blue-600">
                <Icon size={18} strokeWidth={2} />
              </div>
            )}
            <FormControl>
              <Input
                placeholder={placeholder}
                disabled={disabled}
                className={`auth-input-modern ${Icon ? 'pl-10' : 'pl-3.5'} ${
                  isPassword ? 'pr-11' : 'pr-3.5'
                } ${fieldState.error ? 'border-red-400 focus:ring-red-200' : ''}`}
                type={isPassword ? (showPassword ? 'text' : 'password') : type || 'text'}
                {...field}
              />
            </FormControl>
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 z-10 flex items-center p-1 text-gray-400 transition-colors hover:text-gray-700 focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-blue-600" />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            )}
          </div>
          <FormMessage className="form-message mt-1 text-12 font-medium" />
        </div>
      )}
    />
  );
};

export default CustomInput;