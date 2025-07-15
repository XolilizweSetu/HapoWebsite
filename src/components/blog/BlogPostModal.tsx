import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';
import RichTextEditor from './RichTextEditor';
import { useBlogStore } from '../../stores/blogStore';
import type { CreatePostData } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface BlogPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    title: string;
    excerpt: string;
    categoryId: string;
    imageFile?: File;
  };
}

export default function BlogPostModal({ isOpen, onClose, initialData }: BlogPostModalProps) {
  const { createPost, uploadImage, loading } = useBlogStore();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setContent('');
    }
  }, [isOpen]);

  const calculateReadTime = (content: string): number => {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
    const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const handleSubmit = async () => {
    if (!initialData || !content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      let imageUrl = '';
      
      // Upload image if provided
      if (initialData.imageFile) {
        toast.loading('Uploading image...');
        const uploadedUrl = await uploadImage(initialData.imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
          toast.dismiss();
          toast.success('Image uploaded successfully');
        } else {
          toast.dismiss();
          toast.error('Failed to upload image');
          setIsSubmitting(false);
          return;
        }
      }

      const postData: CreatePostData = {
        title: initialData.title,
        excerpt: initialData.excerpt,
        content,
        image_url: imageUrl || null,
        category_id: initialData.categoryId || null,
        read_time: calculateReadTime(content),
        published: true
      };

      console.log('Creating post with data:', postData);

      const result = await createPost(postData);
      
      if (result) {
        toast.success('Blog post published successfully!');
        onClose();
        setContent('');
      } else {
        toast.error('Failed to publish blog post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('An error occurred while publishing the post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setContent('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Write Your Article</h2>
                {initialData && (
                  <p className="text-gray-600 mt-1">{initialData.title}</p>
                )}
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Article Content *
                </label>
                <RichTextEditor content={content} onChange={setContent} />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
              <button
                onClick={handleClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!content.trim() || isSubmitting || loading}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Article'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}