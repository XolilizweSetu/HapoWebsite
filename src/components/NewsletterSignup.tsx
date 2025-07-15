import { useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { newsletterService } from '../services/newsletterService';

interface NewsletterSignupProps {
  className?: string;
  title?: string;
  description?: string;
}

export default function NewsletterSignup({ 
  className = '', 
  title = "Stay Updated",
  description = "Subscribe to our newsletter for the latest insights and updates."
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const response = await newsletterService.subscribe(email);
      setStatus('success');
      setMessage(response.message);
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to subscribe');
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setMessage('');
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-8 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Thank You!</h4>
            <p className="text-gray-600 mb-4">{message}</p>
            <button
              onClick={resetForm}
              className="text-primary hover:text-secondary transition-colors duration-300"
            >
              Subscribe another email
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
                disabled={status === 'loading'}
              />
            </div>

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center text-red-600 text-sm"
              >
                <ExclamationCircleIcon className="w-4 h-4 mr-2" />
                {message}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={status === 'loading' || !email}
              className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {status === 'loading' ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Subscribing...
                </>
              ) : (
                'Subscribe to Newsletter'
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              By subscribing, you agree to receive our newsletter. You can unsubscribe at any time.
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}