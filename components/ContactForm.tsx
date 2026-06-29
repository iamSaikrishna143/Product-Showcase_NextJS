'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Send, CheckCircle2 } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const tempErrors: { name?: string; email?: string; message?: string } = {};

    if (!name.trim()) {
      tempErrors.name = 'Your name is required.';
    }

    if (!email.trim()) {
      tempErrors.email = 'Your email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        tempErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!message.trim()) {
      tempErrors.message = 'A message is required.';
    } else if (message.trim().length < 10) {
      tempErrors.message = 'Your message must be at least 10 characters.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulate API form submission delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Reset form fields
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');

      // Auto clear success notice after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1200);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-3xl border border-emerald-100 bg-emerald-50/30 text-center space-y-4 animate-fade-in">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-extrabold text-neutral-900">Message Sent Successfully!</h4>
          <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">
            Thank you for reaching out. A TechStore customer service specialist will review your inquiry and reply via email within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        placeholder="e.g. Jane Doe"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setErrors((prev) => ({ ...prev, name: undefined }));
        }}
        error={errors.name}
        disabled={isLoading}
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="e.g. janedoe@example.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors((prev) => ({ ...prev, email: undefined }));
        }}
        error={errors.email}
        disabled={isLoading}
      />

      <Input
        label="Subject"
        placeholder="e.g. Warranty Inquiry"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        disabled={isLoading}
      />

      <div className="space-y-1.5">
        <label
          htmlFor="message"
          className="block text-xs font-semibold uppercase tracking-wider text-neutral-500"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="How can we help you?..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setErrors((prev) => ({ ...prev, message: undefined }));
          }}
          disabled={isLoading}
          className={`flex w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 transition-all duration-300 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400 ${
            errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
          }`}
        />
        {errors.message && (
          <p className="text-xs text-red-500 font-medium" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        isLoading={isLoading}
        variant="primary"
        className="w-full h-11 rounded-full font-semibold gap-1.5 shadow-sm mt-2"
      >
        Send Message
        <Send className="h-3.5 w-3.5" />
      </Button>
    </form>
  );
};
