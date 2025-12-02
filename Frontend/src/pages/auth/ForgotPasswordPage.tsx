import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Alert } from '@/components/common/Alert';
import { ArrowLeft, Mail } from 'lucide-react';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // TODO: Implement password reset API call
      // await userApi.forgotPassword(email);

      // Simulated success for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Link
          to="/login"
          className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Login</span>
        </Link>

        <Card>
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary-600" />
            </div>
            <h2 className="text-h2 mb-2">Forgot Password?</h2>
            <p className="text-body text-neutral-600">
              Enter your email and we'll send you instructions to reset your password
            </p>
          </div>

          {error && (
            <Alert type="error" onClose={() => setError('')} className="mb-4">
              {error}
            </Alert>
          )}

          {success ? (
            <div>
              <Alert type="success" className="mb-4">
                Password reset instructions have been sent to your email!
              </Alert>
              <p className="text-sm text-neutral-600 mb-4">
                Check your inbox and follow the link to reset your password.
              </p>
              <Link to="/login">
                <Button variant="primary" className="w-full">
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                icon={<Mail className="w-5 h-5 text-neutral-400" />}
              />

              <Button
                type="submit"
                variant="primary"
                isLoading={loading}
                className="w-full"
              >
                Send Reset Link
              </Button>

              <div className="text-center">
                <Link
                  to="/login"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Remember your password? Sign in
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};
