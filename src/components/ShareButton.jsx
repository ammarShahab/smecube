import React, { useState } from 'react';
import { Share2, Copy, Check, Facebook, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ShareButton = ({ shareUrl, title, description, floating = false }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate the backend share URL
  const backendShareUrl = shareUrl || window.location.href.replace(
    window.location.origin,
    import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000'
  ).replace('/services/domain-hostings', '/share/domain-hostings');

  const encodedUrl = encodeURIComponent(backendShareUrl);
  const encodedTitle = encodeURIComponent(title || document.title);
  const encodedDescription = encodeURIComponent(description || '');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(backendShareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = backendShareUrl;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
      document.body.removeChild(textArea);
    }
  };

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  const handleShare = (url) => {
    window.open(url, '_blank', 'width=600,height=400');
    setShowMenu(false);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || document.title,
          text: description || '',
          url: backendShareUrl,
        });
        setShowMenu(false);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    }
  };

  return (
    <div className="relative">
      {/* Share Button */}
      <motion.button
        onClick={() => setShowMenu(!showMenu)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all font-hind ${
          floating 
            ? 'p-4 rounded-full shadow-2xl' 
            : 'px-4 py-2'
        }`}
        title="শেয়ার করুন"
      >
        <Share2 className="h-5 w-5" />
        {!floating && <span className="font-medium">শেয়ার করুন</span>}
      </motion.button>

      {/* Share Menu */}
      <AnimatePresence>
        {showMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenu(false)}
              className="fixed inset-0 z-40 bg-black/20"
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 text-white">
                <h3 className="font-semibold text-lg font-hind">এই পেজটি শেয়ার করুন</h3>
                <p className="text-sm text-white/80 mt-1 font-hind">সোশ্যাল মিডিয়ায় শেয়ার করুন</p>
              </div>

              {/* Copy Link */}
              <div className="p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2 font-hind">
                  শেয়ার লিঙ্ক
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={backendShareUrl}
                    readOnly
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-600 font-mono"
                  />
                  <motion.button
                    onClick={copyToClipboard}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                      copied
                        ? 'bg-green-500 text-white'
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span className="text-sm font-medium">কপি হয়েছে!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span className="text-sm font-medium">কপি</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Info */}
              <div className="px-4 pb-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-800 font-hind">
                    💡 <strong>টিপস:</strong> এই লিঙ্কটি Facebook, Instagram বা অন্য কোন 
                    সোশ্যাল মিডিয়ায় শেয়ার করলে ছবি সহ দেখাবে।
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareButton;
