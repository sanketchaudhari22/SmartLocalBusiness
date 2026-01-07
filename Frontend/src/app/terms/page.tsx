'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/footer';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Smart Local Business
          </Link>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Smart Local Business, you accept and agree to be bound by the
                terms and provision of this agreement. If you do not agree to abide by these terms,
                please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                Smart Local Business provides an online platform that connects customers with local
                businesses and service providers. Our service allows users to discover businesses,
                read reviews, and book appointments online.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              <p className="text-muted-foreground leading-relaxed">
                To access certain features of the service, you must register for an account. When
                registering, you agree to provide accurate, current, and complete information. You
                are responsible for safeguarding your password and for all activities that occur
                under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. User Conduct</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">You agree not to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Use the service for any unlawful purpose</li>
                <li>Post false, inaccurate, or misleading content</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Attempt to gain unauthorized access to the service</li>
                <li>Interfere with the proper working of the service</li>
                <li>Use automated means to access the service without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Business Listings</h2>
              <p className="text-muted-foreground leading-relaxed">
                Businesses listed on our platform are responsible for the accuracy of their
                information, pricing, and availability. We do not guarantee the quality of services
                provided by listed businesses. Users should verify information directly with
                businesses before booking.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Bookings and Payments</h2>
              <p className="text-muted-foreground leading-relaxed">
                Bookings made through our platform are subject to the terms and conditions of the
                respective business. Cancellation policies vary by business. Any payments for
                services are between the user and the business unless otherwise stated.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Reviews and Content</h2>
              <p className="text-muted-foreground leading-relaxed">
                Users may post reviews and other content. By posting, you grant us a non-exclusive,
                worldwide, royalty-free license to use, display, and distribute such content. We
                reserve the right to remove content that violates these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                The service and its original content, features, and functionality are owned by
                Smart Local Business and are protected by international copyright, trademark, and
                other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Smart Local Business shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages resulting from your use of the service. Our
                liability is limited to the maximum extent permitted by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of
                significant changes. Continued use of the service after changes constitutes
                acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:legal@smartlocalbusiness.com" className="text-primary hover:underline">
                  legal@smartlocalbusiness.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
