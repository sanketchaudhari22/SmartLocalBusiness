'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Footer } from '@/components/layout/footer';
import {
  Search,
  Calendar,
  Star,
  CheckCircle,
  ArrowRight,
  Users,
  Shield,
  Clock,
  MessageSquare,
} from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Search & Discover',
    description:
      'Browse thousands of local businesses by category, location, or service. Use filters to find exactly what you need.',
  },
  {
    number: '02',
    icon: Star,
    title: 'Read Reviews',
    description:
      'Check ratings and read authentic reviews from real customers to make informed decisions about your choice.',
  },
  {
    number: '03',
    icon: Calendar,
    title: 'Book Instantly',
    description:
      'Select your preferred date and time, add any special requests, and book your appointment in seconds.',
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Get Confirmed',
    description:
      'Receive instant confirmation and reminders. Show up and enjoy the service you booked.',
  },
];

const features = [
  {
    icon: Shield,
    title: 'Verified Businesses',
    description: 'All businesses on our platform are verified and vetted for quality assurance.',
  },
  {
    icon: Clock,
    title: '24/7 Booking',
    description: 'Book appointments anytime, anywhere. No need to call during business hours.',
  },
  {
    icon: MessageSquare,
    title: 'Direct Communication',
    description: 'Message businesses directly with questions or special requests.',
  },
  {
    icon: Users,
    title: 'Community Reviews',
    description: 'Real reviews from real customers help you make the best choice.',
  },
];

export default function HowItWorksPage() {
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

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover, book, and enjoy local services in just a few simple steps.
            We make connecting with local businesses effortless.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-6xl font-bold text-primary/10 mb-4">{step.number}</div>
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden lg:block absolute top-24 -right-4 h-8 w-8 text-primary/30" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to making your local service experience seamless and reliable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For Customers */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">For Customers</h2>
            <ul className="space-y-4">
              {[
                'Find local businesses near you instantly',
                'Read verified reviews and ratings',
                'Book appointments online 24/7',
                'Receive booking confirmations and reminders',
                'Manage all your bookings in one place',
                'Leave reviews to help others',
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8">
              <Link href="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 aspect-square flex items-center justify-center">
            <div className="text-center">
              <Users className="h-24 w-24 text-primary/50 mx-auto mb-4" />
              <p className="text-2xl font-bold">1000+</p>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of users who trust Smart Local Business to find and book local services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/search">Browse Services</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
              <Link href="/register">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
