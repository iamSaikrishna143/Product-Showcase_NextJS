'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { ShoppingBag, ArrowLeft, ArrowRight, UserPlus } from 'lucide-react';
import Link from 'next/link';

function LoginPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, loginAsGuest, isAuthenticated } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ username?: string; email?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const redirectTarget = searchParams.get('redirect') || '/';

  // If already authenticated, redirect to destination
  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectTarget);
    }
  }, [isAuthenticated, router, redirectTarget]);

  const validate = () => {
    const tempErrors: { username?: string; email?: string } = {};
    
    if (!username.trim()) {
      tempErrors.username = 'Username is required.';
    } else if (username.trim().length < 3) {
      tempErrors.username = 'Username must be at least 3 characters.';
    }

    if (!email.trim()) {
      tempErrors.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        tempErrors.email = 'Please enter a valid email address.';
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    const success = await login(username.trim(), email.trim());
    setIsLoading(false);
    
    if (success) {
      router.push(redirectTarget);
    } else {
      setErrors({ username: 'Failed to authenticate. Please check fields.' });
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    router.push(redirectTarget);
  };

  return (
    <div className="mx-auto max-w-md w-full px-6 py-16 sm:py-24 animate-fade-in flex flex-col justify-center min-h-[75vh]">
      
      {/* Brand logo & Header */}
      <div className="text-center space-y-3 mb-8">
        <Link href="/" className="inline-flex items-center gap-2 group justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-white transition-transform duration-300 group-hover:scale-105">
            <ShoppingBag className="h-5.5 w-5.5" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-neutral-900">
            Tech<span className="text-neutral-500 font-medium">Store</span>
          </span>
        </Link>
        <div>
          <h1 className="text-xl font-extrabold text-neutral-900">
            Welcome to TechStore
          </h1>
          <p className="text-xs text-neutral-400 font-medium mt-1">
            Sign in to manage your cart, orders, and checkout.
          </p>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="bg-neutral-50/50 p-6 sm:p-8 rounded-[2.5rem] border border-neutral-100 space-y-6 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <Input
            label="Username"
            placeholder="e.g. John Doe"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors((prev) => ({ ...prev, username: undefined }));
            }}
            error={errors.username}
            disabled={isLoading}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="e.g. johndoe@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            error={errors.email}
            disabled={isLoading}
          />

          <Button
            type="submit"
            isLoading={isLoading}
            variant="primary"
            className="w-full h-11 rounded-full font-semibold gap-1.5 shadow-sm mt-2"
          >
            Sign In
            <ArrowRight className="h-4 w-4" />
          </Button>

        </form>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-neutral-200"></div>
          <span className="flex-shrink mx-3 text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Or</span>
          <div className="flex-grow border-t border-neutral-200"></div>
        </div>

        {/* Guest sign in trigger */}
        <Button
          onClick={handleGuestLogin}
          type="button"
          disabled={isLoading}
          variant="secondary"
          className="w-full h-11 rounded-full font-semibold gap-1.5 border border-neutral-200/60"
        >
          <UserPlus className="h-4 w-4" />
          Browse as Guest
        </Button>
      </div>

      {/* Back link */}
      <div className="text-center mt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Home Page
        </Link>
      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[75vh] flex items-center justify-center"><ShoppingBag className="animate-spin text-neutral-900 h-10 w-10" /></div>}>
      <LoginPageInner />
    </Suspense>
  );
}
