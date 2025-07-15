import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { newsletterService } from '../services/newsletterService';

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'form'>('loading');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [inputEmail, setInputEmail] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      unsubscribeWithToken(token);
    } else {
      setStatus('form');
    }
  }, [searchParams]);

  const unsubscribeWithToken = async (token: string) => {
    try {
      const response = await newsletterService.unsubscribe(undefined, token);
      setStatus('success');
      setMessage(response.message);
      setEmail(response.email);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unsubscribe failed');
    }
  };

  const handleEmailUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputEmail) return;

    setStatus('loading');
    try {
      const response = await newsletterService.unsubscribe(inputEmail);
      setStatus('success');
      setMessage(response.message);
      setEmail(response.email);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unsubscribe failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          {status === 'loading' && (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Request</h2>
              <p className="text-gray-600">Please wait while we process your unsubscribe request...</p>
            </>
          )}

          {status === 'form' && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Unsubscribe from Newsletter</h2>
              <p className="text-gray-600 mb-6">
                We're sorry to see you go. Enter your email address to unsubscribe from our newsletter.
              </p>
              <form onSubmit={handleEmailUnsubscribe} className="space-y-4">
                <input
                  type="email"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                  Unsubscribe
                </button>
              </form>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Successfully Unsubscribed</h2>
              <p className="text-gray-600 mb-4">{message}</p>
              <p className="text-sm text-gray-500">
                {email} has been removed from our newsletter list. You won't receive any more emails from us.
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Unsubscribe Failed</h2>
              <p className="text-gray-600 mb-4">{message}</p>
              <button
                onClick={() => setStatus('form')}
                className="text-primary hover:text-secondary transition-colors duration-300"
              >
                Try again
              </button>
            </>
          )}

          <div className="mt-6">
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-300"
            >
              Return to Home
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}