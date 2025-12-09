import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Search, Clock } from 'lucide-react';
import api from '../../services/api';

const ConversationList = ({ onSelectConversation, isAdmin = false }) => {
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    // Get user role from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userIsAdmin = user.role === 'admin' || isAdmin;
    
    console.log('ConversationList useEffect - User from localStorage:', user);
    console.log('ConversationList useEffect - isAdmin prop:', isAdmin);
    console.log('ConversationList useEffect - Determined userIsAdmin:', userIsAdmin);
    
    fetchConversations(userIsAdmin);
    
    // Fetch on page visibility change (when user returns to tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('Tab became visible, refreshing conversations');
        fetchConversations(userIsAdmin);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Only poll occasionally to catch updates, but much less frequently
    // Real-time updates should handle most cases
    const interval = setInterval(() => fetchConversations(userIsAdmin), 15000); // Poll every 15 seconds instead of 3
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(interval);
    };
  }, [isAdmin]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchConversations = async (isAdminUser = false) => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = isAdminUser ? '/admin/messages/conversations' : '/messages/conversations';
      const response = await api.get(endpoint);
      console.log(`Fetched conversations from ${endpoint}:`, response.data);
      
      // Both endpoints now return { success: true, data: [...] } format
      const conversationData = response.data.data || [];
      console.log('Conversation data array:', conversationData);
      console.log('Is array?', Array.isArray(conversationData));
      console.log('Data count:', conversationData.length);
      
      setConversations(Array.isArray(conversationData) ? conversationData : []);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
      console.error('Error response:', error.response?.data);
      setError(error.response?.data?.message || 'Failed to load conversations');
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredConversations = (conversations || []).filter(conv => {
    const searchLower = debouncedSearch.toLowerCase();
    
    // For admin: handle both conversation objects and standalone user objects
    const name = conv.subject || conv.user?.name || (conv.name) || 'Support Chat';
    const email = conv.user?.email || (conv.email) || '';
    const phone = conv.user?.phone || (conv.phone) || '';
    
    return (
      name.toLowerCase().includes(searchLower) ||
      email.toLowerCase().includes(searchLower) ||
      phone.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-blue-600" />
          Messages
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="p-8 text-center">
            <div className="text-red-500 mb-2">⚠️</div>
            <p className="text-sm text-gray-600">{error}</p>
            <button
              onClick={() => {
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                const userIsAdmin = user.role === 'admin' || isAdmin;
                fetchConversations(userIsAdmin);
              }}
              className="mt-3 text-sm text-blue-600 hover:text-blue-700"
            >
              Try again
            </button>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p>No conversations yet</p>
            <p className="text-xs text-gray-400 mt-1">Start a new conversation below</p>
          </div>
        ) : (
          filteredConversations.map((conversation, index) => (
            <motion.div
              key={conversation.id ? `conv-${conversation.id}` : `user-${conversation.user_id}-${index}`}
              whileHover={{ backgroundColor: '#f9fafb' }}
              onClick={() => onSelectConversation(conversation)}
              className="p-4 border-b border-gray-100 cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {conversation.subject || conversation.user?.name || 'Support Chat'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                    {conversation.user?.email && (
                      <span className="text-xs text-gray-500">{conversation.user.email}</span>
                    )}
                    {conversation.last_message?.message && (
                      <span>{conversation.last_message.message}</span>
                    )}
                    {!conversation.last_message?.message && !conversation.is_new && (
                      <span>No messages yet</span>
                    )}
                    {conversation.is_new && (
                      <span className="text-xs text-blue-600 font-medium">New user - Ready to message</span>
                    )}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>
                      {conversation.last_message_at
                        ? new Date(conversation.last_message_at).toLocaleString()
                        : 'Just joined'}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {conversation.unread_count > 0 && (
                    <div className="bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {conversation.unread_count > 9 ? '9+' : conversation.unread_count}
                    </div>
                  )}
                  {conversation.is_new && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                      New
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    conversation.status === 'open'
                      ? 'bg-green-100 text-green-700'
                      : conversation.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {conversation.status || 'Open'}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* New Conversation Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => onSelectConversation(null)}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 active:scale-100 transition-all"
        >
          New Conversation
        </button>
      </div>
    </div>
  );
};

export default ConversationList;
