'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, User, Menu, X, Search, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-white transition-transform duration-300 group-hover:scale-105">
                <ShoppingBag className="h-5 w-5 stroke-[2]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-neutral-900">
                Tech<span className="text-neutral-500 font-medium">Store</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-neutral-900',
                  pathname === link.href ? 'text-neutral-900 font-semibold' : 'text-neutral-500'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex relative max-w-xs w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full bg-neutral-50 px-4 py-1.5 pl-10 text-xs text-neutral-800 transition-all border border-transparent focus:bg-white focus:border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200"
            />
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-400" />
          </form>

          {/* Actions Panel */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Search Icon (for smaller desktop screens that hide the form) */}
            <button
              onClick={() => router.push('/products')}
              className="lg:hidden p-2 rounded-full text-neutral-500 hover:bg-neutral-50"
              aria-label="Search Catalog"
            >
              <Search className="h-5 w-5 stroke-[1.5]" />
            </button>

            {/* Shopping Cart Trigger */}
            <Link
              href="/cart"
              className="relative p-2 rounded-full text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 transition-all"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="h-5 w-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-bold text-white ring-2 ring-white animate-bounce-short">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth status block */}
            <div className="hidden md:flex items-center gap-2 border-l border-neutral-100 pl-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-neutral-800">
                    Hi, {user?.username.split(' ')[0]}
                  </span>
                  <button
                    onClick={logout}
                    className="p-1.5 rounded-full text-neutral-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Logout"
                    aria-label="Logout"
                  >
                    <LogOut className="h-4 w-4 stroke-[1.5]" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-neutral-900 border border-neutral-200 rounded-full px-3 py-1.5 hover:bg-neutral-50 transition-all"
                >
                  <User className="h-3.5 w-3.5 stroke-[2]" />
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-neutral-500 hover:bg-neutral-50"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 stroke-[1.5]" /> : <Menu className="h-5 w-5 stroke-[1.5]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white px-4 py-4 space-y-4 animate-fade-in shadow-inner">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full bg-neutral-50 px-4 py-2 pl-10 text-sm text-neutral-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-200"
            />
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
          </form>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'px-3 py-2 rounded-xl text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-neutral-100 pt-4">
            {isAuthenticated ? (
              <div className="flex items-center justify-between px-3">
                <div>
                  <p className="text-xs text-neutral-400">Signed in as</p>
                  <p className="text-sm font-semibold text-neutral-800">{user?.username}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-red-600 border border-red-100 bg-red-50/50 rounded-full px-3 py-1.5 hover:bg-red-50"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 text-sm font-semibold text-neutral-700 hover:text-neutral-900 border border-neutral-200 rounded-full px-4 py-2.5 hover:bg-neutral-50 transition-all text-center w-full"
              >
                <User className="h-4 w-4" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
