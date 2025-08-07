import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useBlogStore } from '../stores/blogStore';
import CreatePostForm from '../components/blog/CreatePostForm';
import AuthModal from '../components/blog/AuthModal';
import NewsletterSignup from '../components/NewsletterSignup';
import NewsletterDashboard from '../components/admin/NewsletterDashboard';
import { Toaster } from 'react-hot-toast';

export default function Blog() {
  const {
    posts,
    loading,
    user,
    isAuthenticated,
    fetchPosts,
    checkAuth,
    signOut
  } = useBlogStore();

  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showNewsletterDashboard, setShowNewsletterDashboard] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, [checkAuth, fetchPosts]);

  const togglePost = (postId: string) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white">
      <Toaster position="top-right" />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

      {/* Hero Section */}
      <div className="relative bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Insights & Innovation</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Stay updated with the latest trends, insights, and innovations in digital signage and advertising technology.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isAuthenticated && (
          <div className="mb-8 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.email}</span>
              <button
                onClick={() => setShowNewsletterDashboard(!showNewsletterDashboard)}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                {showNewsletterDashboard ? 'Hide' : 'Show'} Newsletter Dashboard
              </button>
              <button
                onClick={signOut}
                className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {isAuthenticated && showNewsletterDashboard && (
          <div className="mb-12">
            <NewsletterDashboard />
          </div>
        )}

        {isAuthenticated && <CreatePostForm />}

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white group cursor-pointer transition-all duration-300 ${
                  expandedPost === post.id ? 'lg:col-span-3 md:col-span-2' : ''
                }`}
                onClick={() => togglePost(post.id)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={
                      post.image_url ||
                      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    }
                    alt={post.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-sm">
                    {post.category?.name || 'Uncategorized'}
                  </div>
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 text-sm rounded-full">
                    {expandedPost === post.id ? 'Click to collapse' : 'Click to read'}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>{formatDate(post.created_at)}</span>
                    <span className="mx-2">•</span>
                    <span>{post.read_time} min read</span>
                    {post.source && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{post.source}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-600">{post.excerpt}</p>

                  {post.source && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                      <div className="flex items-center text-sm">
                        <span className="font-medium text-gray-700 mr-2">Source:</span>
                        {post.source_url ? (
                          <a
                            href={post.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            {post.source}
                          </a>
                        ) : (
                          <span className="text-gray-700">{post.source}</span>
                        )}
                      </div>
                    </div>
                  )}

                  {expandedPost === post.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-6 pt-6 border-t border-gray-200"
                    >
                      <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />
                    </motion.div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts yet</h3>
            <p className="text-gray-600">Check back soon for the latest insights and updates!</p>
          </div>
        )}

        {/* Newsletter Signup and Socials at the Bottom */}
        <div className="mt-16 text-center">
          <NewsletterSignup />

          {/* Social Media Links */}
          <div className="mt-10">
            <p className="text-lg text-gray-700 mb-4">Follow us on social media:</p>
            <div className="flex justify-center space-x-6">
              {/* Instagram */}
              <a
                href="https://instagram.com/hapo_technology/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.2c3.1 0 3.5.01 4.7.07a6 6 0 0 1 4.2 1.6 6 6 0 0 1 1.6 4.2c.06 1.2.07 1.6.07 4.7s-.01 3.5-.07 4.7a6 6 0 0 1-1.6 4.2 6 6 0 0 1-4.2 1.6c-1.2.06-1.6.07-4.7.07s-3.5-.01-4.7-.07a6 6 0 0 1-4.2-1.6 6 6 0 0 1-1.6-4.2c-.06-1.2-.07-1.6-.07-4.7s.01-3.5.07-4.7a6 6 0 0 1 1.6-4.2A6 6 0 0 1 7.3 2.3c1.2-.06 1.6-.07 4.7-.07zm0-2.2C8.7 0 8.2 0 7 .07a8.2 8.2 0 0 0-5.9 2.5A8.2 8.2 0 0 0 .6 8.4C.5 9.6.5 10.1.5 12s0 2.4.07 3.6a8.2 8.2 0 0 0 2.5 5.9 8.2 8.2 0 0 0 5.9 2.5c1.2.07 1.7.07 3.6.07s2.4 0 3.6-.07a8.2 8.2 0 0 0 5.9-2.5 8.2 8.2 0 0 0 2.5-5.9c.07-1.2.07-1.7.07-3.6s0-2.4-.07-3.6a8.2 8.2 0 0 0-2.5-5.9A8.2 8.2 0 0 0 16.9.1C15.7 0 15.2 0 12 0z" />
                  <circle cx="12" cy="12" r="3.2" />
                  <circle cx="18.4" cy="5.6" r="1.4" />
                </svg>
                Instagram
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/hapo-technology/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.37V9h3.4v1.56h.05c.47-.88 1.6-1.8 3.3-1.8 3.54 0 4.2 2.33 4.2 5.35v6.34zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM6.9 20.45H3.78V9h3.12v11.45z" />
                </svg>
                LinkedIn
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@hapo_technology"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-black border border-white text-white rounded-lg hover:bg-white hover:text-black transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224 80a80 80 0 0 1-48-16v88a64 64 0 1 1-64-64c1.5 0 3 .1 4.4.3V56.2a88.1 88.1 0 1 0 107.6 86.3V80Z" />
                </svg>
                TikTok
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
