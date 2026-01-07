'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Footer } from '@/components/layout/footer';
import {
  Store,
  TrendingUp,
  Calendar,
  Star,
  Users,
  BarChart,
  CheckCircle,
  ArrowRight,
  DollarSign,
  Clock,
  Shield,
} from 'lucide-react';

const benefits = [
  {
    icon: Users,
    title: 'Reach More Customers',
    description: 'Get discovered by thousands of potential customers searching for services like yours.',
  },
  {
    icon: Calendar,
    title: 'Online Bookings',
    description: 'Accept bookings 24/7 without lifting a finger. Let customers book when it suits them.',
  },
  {
    icon: Star,
    title: 'Build Reputation',
    description: 'Collect reviews and ratings to build trust and attract more customers.',
  },
  {
    icon: BarChart,
    title: 'Business Insights',
    description: 'Track your performance with detailed analytics and booking statistics.',
  },
  {
    icon: DollarSign,
    title: 'Increase Revenue',
    description: 'Reduce no-shows and fill empty slots with our booking management system.',
  },
  {
    icon: Clock,
    title: 'Save Time',
    description: 'Automate scheduling, reminders, and customer communications.',
  },
];

const pricing = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for getting started',
    features: [
      'Basic business listing',
      'Up to 50 bookings/month',
      'Customer reviews',
      'Email notifications',
    ],
  },
  {
    name: 'Professional',
    price: '$29',
    period: '/month',
    description: 'For growing businesses',
    popular: true,
    features: [
      'Everything in Starter',
      'Unlimited bookings',
      'Priority support',
      'Analytics dashboard',
      'SMS notifications',
      'Custom booking page',
    ],
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    description: 'For large businesses',
    features: [
      'Everything in Professional',
      'Multiple locations',
      'API access',
      'Dedicated account manager',
      'Custom integrations',
      'White-label options',
    ],
  },
];

export default function ForBusinessPage() {
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
              <Link href="/register">List Your Business</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Grow Your Business with Smart Local Business
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of local businesses already using our platform to reach new customers,
              manage bookings, and grow their revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10,000+', label: 'Businesses' },
              { value: '500,000+', label: 'Bookings' },
              { value: '98%', label: 'Satisfaction' },
              { value: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why List Your Business</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage and grow your business online.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your business needs. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.map((plan, index) => (
              <Card
                key={index}
                className={plan.popular ? 'border-primary shadow-lg relative' : ''}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white text-sm px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full mt-6"
                    variant={plan.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <Link href="/register">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Get Started in 3 Easy Steps</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              step: '1',
              title: 'Create Account',
              description: 'Sign up for free and create your business profile.',
            },
            {
              step: '2',
              title: 'Add Services',
              description: 'List your services, set prices, and business hours.',
            },
            {
              step: '3',
              title: 'Start Receiving Bookings',
              description: 'Get discovered by customers and accept online bookings.',
            },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of businesses already using Smart Local Business to reach more customers.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">
              List Your Business Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
