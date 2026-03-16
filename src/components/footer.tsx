'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
  shop: [
    { name: 'Clip-In Extensions', href: '/products?category=clip-in' },
    { name: 'Tape-In Extensions', href: '/products?category=tape-in' },
    { name: 'Ponytails', href: '/products?category=ponytails' },
    { name: 'Wefts', href: '/products?category=wefts' },
  ],
  services: [
    { name: 'Find a Stylist', href: '/services/stylist' },
    { name: 'Education', href: '/services/education' },
    { name: 'Colour Match', href: '/services/colour-match' },
    { name: 'Consultation', href: '/services/consultation' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Shipping & Returns', href: '/shipping-returns' },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-light mb-4">
              Join Our Newsletter
            </h3>
            <p className="text-gray-400 mb-6">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            {subscribed ? (
              <p className="text-green-400">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-gray-700 text-white placeholder:text-gray-500 flex-1"
                />
                <Button
                  type="submit"
                  className="bg-white text-black hover:bg-gray-200"
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-bold tracking-wider mb-4">
              D.S HAIR &amp; BEAUTY
            </h4>
            <p className="text-gray-400 text-sm">
              Premium quality hair extensions for the modern woman. 
              Professional-grade products for salon and home use.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h5 className="font-medium mb-4 uppercase tracking-wide text-sm text-gray-400">
              Shop
            </h5>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h5 className="font-medium mb-4 uppercase tracking-wide text-sm text-gray-400">
              Services
            </h5>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h5 className="font-medium mb-4 uppercase tracking-wide text-sm text-gray-400">
              Company
            </h5>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2024 D.S Hair & Beauty. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
