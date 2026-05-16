import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

interface EmailCaptureFormProps {
  leadMagnet?: string;
  source?: string;
  onSuccess?: () => void;
}

export default function EmailCaptureForm({ 
  leadMagnet = "Personal Branding Tips & Strategies", 
  source = "lead-magnet",
  onSuccess 
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const subscribeEmail = trpc.email.subscribe.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      const result = await subscribeEmail.mutateAsync({
        email,
        name: name || undefined,
        source,
      });

      if (result.success) {
        setSubmitted(true);
        setEmail('');
        setName('');
        toast.success(result.message);
        onSuccess?.();
        
        // Reset form after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('Email subscription error:', error);
    }
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-gradient-to-br from-amber-50 to-rose-50 rounded-lg border border-amber-200">
        <div className="flex flex-col items-center text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Welcome to the Community!
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Check your email for your free {leadMagnet}. It's on its way!
          </p>
          <p className="text-xs text-gray-500">
            Don't forget to check your spam folder if you don't see it in a few minutes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Get Your Free Guide
        </h3>
        <p className="text-sm text-gray-600">
          Join our community and receive <span className="font-medium">{leadMagnet}</span> delivered to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <Button
          type="submit"
          disabled={subscribeEmail.isPending}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
        >
          <Mail className="w-4 h-4 mr-2" />
          {subscribeEmail.isPending ? 'Subscribing...' : 'Get Free Guide'}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </form>

      {subscribeEmail.isError && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-red-700">
            {subscribeEmail.error?.message || 'Failed to subscribe. Please try again.'}
          </p>
        </div>
      )}
    </div>
  );
}
