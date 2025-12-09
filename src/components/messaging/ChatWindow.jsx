import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Paperclip, Video, Image as ImageIcon, File, History } from 'lucide-react';
import api from '../../services/api';
import PhoneNumberModal from './PhoneNumberModal';
import IncomingCallNotification from './IncomingCallNotification';
import CallHistory from './CallHistory';
import { listenToConversation } from '../../services/echo';

const ChatWindow = ({ isOpen, onClose, conversationId = null, isEmbedded = false, onMessageSent = null }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [isOtherPersonActive, setIsOtherPersonActive] = useState(true);
  const [activeConversationId, setActiveConversationId] = useState(conversationId);
  const [activeTab, setActiveTab] = useState('messages'); // 'messages' or 'history'
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Update active conversation ID when prop changes
    setActiveConversationId(conversationId);
  }, [conversationId]);

  useEffect(() => {
    if (isOpen && activeConversationId) {
      // Fetch messages immediately when opening or switching conversations
      fetchMessages();
      
      // Also fetch on page visibility change (tab switch back)
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible' && activeConversationId) {
          console.log('Tab became visible, refreshing messages');
          fetchMessages();
        }
      };
      
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Listen for real-time messages
      const unsubscribe = listenToConversation(activeConversationId, {
        onMessageSent: (event) => {
          console.log('Real-time message received:', event.message);
          // Only add if not already in messages
          setMessages(prev => {
            const messageExists = prev.some(msg => msg.id === event.message.id);
            if (messageExists) {
              return prev; // Don't add duplicate
            }
            return [...prev, event.message];
          });
        },
        onVideoCallInitiated: (event) => {
          if (window.confirm('Incoming video call. Join now?')) {
            window.open(`/video-call/${event.videoCall.room_id}`, '_blank');
          }
        }
      });

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      };
    }
  }, [isOpen, activeConversationId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Define fetchMessages with useCallback to avoid stale closure issues
  const fetchMessages = useCallback(async () => {
    if (!activeConversationId) {
      setMessages([]);
      return;
    }
    try {
      setLoading(true);
      
      // Determine the correct endpoint based on user role
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const isAdmin = user.role === 'admin';
      const endpoint = isAdmin 
        ? `/admin/messages/conversations/${activeConversationId}`
        : `/messages/conversations/${activeConversationId}`;
      
      const response = await api.get(endpoint);
      console.log('Messages fetched from', endpoint, ':', response.data.data);
      if (response.data.data && Array.isArray(response.data.data)) {
        setMessages(response.data.data);
      } else {
        console.warn('Invalid messages format:', response.data);
        setMessages([]);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error.response || error);
    } finally {
      setLoading(false);
    }
  }, [activeConversationId]);

  useEffect(() => {
    if (isOpen && activeConversationId) {
      // Fetch messages immediately when opening or switching conversations
      fetchMessages();
      
      // Also fetch on page visibility change (tab switch back)
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible' && activeConversationId) {
          console.log('Tab became visible, refreshing messages');
          fetchMessages();
        }
      };
      
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Listen for real-time messages
      const unsubscribe = listenToConversation(activeConversationId, {
        onMessageSent: (event) => {
          console.log('Real-time message received:', event.message);
          // Only add if not already in messages
          setMessages(prev => {
            const messageExists = prev.some(msg => msg.id === event.message.id);
            if (messageExists) {
              return prev; // Don't add duplicate
            }
            return [...prev, event.message];
          });
        },
        onVideoCallInitiated: (event) => {
          if (window.confirm('Incoming video call. Join now?')) {
            window.open(`/video-call/${event.videoCall.room_id}`, '_blank');
          }
        }
      });

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      };
    }
  }, [isOpen, activeConversationId, fetchMessages]);

  // Helper function to determine file type from MIME type
  const getFileType = (mimeType) => {
    if (!mimeType) return 'file';
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.includes('pdf')) return 'pdf';
    if (mimeType.includes('word') || mimeType.includes('document')) return 'document';
    return 'file';
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !attachment) return;

    setLoading(true);
    const formData = new FormData();
    
    if (editingMessage) {
      // Update existing message
      formData.append('message', newMessage);
      formData.append('_method', 'PUT');
      
      try {
        const response = await api.post(`/messages/${editingMessage.id}`, formData);
        setMessages(prev => prev.map(msg => 
          msg.id === editingMessage.id ? response.data.data : msg
        ));
        setNewMessage('');
        setEditingMessage(null);
      } catch (error) {
        console.error('Failed to update message:', error);
        alert('Failed to update message');
      } finally {
        setLoading(false);
      }
      return;
    }

    // Send new message
    if (newMessage.trim()) {
      formData.append('message', newMessage);
    }
    if (activeConversationId) {
      formData.append('conversation_id', activeConversationId);
    }
    if (attachment) {
      formData.append('attachment', attachment);
    }

    try {
      // Determine the correct endpoint based on user role
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const isAdmin = user.role === 'admin';
      
      let sendEndpoint;
      if (isAdmin && activeConversationId) {
        // Admin sends message to specific conversation
        sendEndpoint = `/admin/messages/conversations/${activeConversationId}/send`;
      } else {
        // Client creates or sends to conversation
        sendEndpoint = '/messages/send';
      }
      
      // Optimistically add message to UI immediately (before response)
      const optimisticMessage = {
        id: `temp-${Date.now()}`,
        message: newMessage.trim(),
        sender_type: isAdmin ? 'App\\Models\\Admin' : 'App\\Models\\User',
        sender_id: user.id,
        sender: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
        },
        attachment_url: attachment ? URL.createObjectURL(attachment) : null,
        attachment_type: attachment ? getFileType(attachment.type) : null,
        created_at: new Date().toISOString(),
        is_read: false,
        is_pending: true // Mark as pending
      };
      
      // Add optimistic message immediately
      setMessages(prev => [...prev, optimisticMessage]);
      setNewMessage('');
      setAttachment(null);
      setEditingMessage(null);
      
      const response = await api.post(sendEndpoint, formData);
      console.log('Message sent successfully:', response.data);

      if (response.data.data) {
        // Replace optimistic message with real one
        setMessages(prev => 
          prev.map(msg => 
            msg.id === optimisticMessage.id ? { ...response.data.data, is_pending: false } : msg
          )
        );
        
        // CRITICAL: If this was a new conversation, update the conversation ID
        if (response.data.conversation && response.data.conversation.id) {
          const newConvId = response.data.conversation.id;
          console.log('New conversation created with ID:', newConvId);
          
          // Update active conversation
          setActiveConversationId(newConvId);
          
          // Notify parent component about new conversation
          if (onMessageSent) {
            onMessageSent({
              ...response.data,
              newConversationId: newConvId
            });
          }
        } else {
          // Notify parent component
          if (onMessageSent) {
            onMessageSent(response.data);
          }
        }
      }
    } catch (error) {
      // Remove optimistic message on error
      setMessages(prev => prev.filter(msg => msg.id && !msg.id.startsWith('temp-')));
      
      if (error.response?.status === 403 && error.response?.data?.error === 'phone_required') {
        setShowPhoneModal(true);
      } else {
        console.error('Failed to send message:', error);
        alert(error.response?.data?.message || 'Failed to send message');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleContextMenu = (e, message) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const isMyMessage = message.sender_type === 'App\\Models\\User' && currentUser.role !== 'admin';
    
    if (!isMyMessage) return;

    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      message: message
    });
  };

  const handleEdit = () => {
    if (contextMenu?.message) {
      setEditingMessage(contextMenu.message);
      setNewMessage(contextMenu.message.message);
      setContextMenu(null);
    }
  };

  const handleDelete = async () => {
    if (!contextMenu?.message) return;
    
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await api.delete(`/messages/${contextMenu.message.id}`);
        setMessages(prev => prev.filter(msg => msg.id !== contextMenu.message.id));
        setContextMenu(null);
      } catch (error) {
        console.error('Failed to delete message:', error);
        alert('Failed to delete message');
      }
    }
  };

  // Close context menu on click outside
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    if (contextMenu) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [contextMenu]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) { // 10MB limit
      setAttachment(file);
    } else {
      alert('File size must be less than 10MB');
    }
  };

  const handleInitiateVideoCall = async () => {
    if (!activeConversationId) {
      alert('Please select a conversation first');
      return;
    }
    try {
      const response = await api.post('/video-calls/initiate', {
        conversation_id: activeConversationId
      });
      window.open(`/video-call/${response.data.data.room_id}`, '_blank');
    } catch (error) {
      console.error('Failed to initiate video call:', error);
      alert('Failed to initiate video call. Please try again.');
    }
  };

  const chatContent = (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-lg font-bold">A</span>
            {isOtherPersonActive && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
            )}
          </div>
          <div>
            <h3 className="font-semibold">Support Chat</h3>
            <p className="text-xs text-white/80">
              {isOtherPersonActive ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleInitiateVideoCall}
            className="p-2 rounded-full transition-colors hover:bg-white/20 cursor-pointer"
            title="Start video call"
          >
            <Video className="w-5 h-5" />
          </button>
          {!isEmbedded && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white">
        <button
          onClick={() => setActiveTab('messages')}
          className={`flex-1 py-3 px-4 font-semibold transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'messages'
              ? 'text-cyan-600 border-b-2 border-cyan-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Send className="w-4 h-4" />
          Messages
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 px-4 font-semibold transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'history'
              ? 'text-cyan-600 border-b-2 border-cyan-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <History className="w-4 h-4" />
          Call History
        </button>
      </div>

      {/* Content */}
      {activeTab === 'messages' ? (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages
            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
            .map((message) => {
            if (!message || !message.id) return null;
            const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
            const isMyMessage = message.sender_type === 'App\\Models\\User' && currentUser.role !== 'admin';
            const isAdminMessage = message.sender_type === 'App\\Models\\Admin' || (message.sender_type === 'App\\Models\\User' && currentUser.role === 'admin');
            
            // Helper function to determine if attachment is image
            const isImageAttachment = (url) => {
              if (!url) return false;
              return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
            };
            
            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}
                onContextMenu={(e) => handleContextMenu(e, message)}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-2xl cursor-context-menu ${
                    isMyMessage
                      ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-br-none text-lg' // increased font size
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm text-base'
                  }`}
                >
                  {/* Display attachment (image or file) */}
                  {message.attachment_url && (
                    <div className="mb-2">
                      {isImageAttachment(message.attachment_url) ? (
                        <img 
                          src={message.attachment_url} 
                          alt="attachment" 
                          className="max-w-[250px] rounded-lg object-cover"
                          onError={(e) => {
                            console.error('Image failed to load:', message.attachment_url);
                          }}
                        />
                      ) : (
                        <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg text-sm">
                          <File className="w-5 h-5 text-gray-600" />
                          <a 
                            href={message.attachment_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 hover:underline truncate"
                          >
                            {message.attachment_url.split('/').pop()}
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Message text */}
                  <p className="text-sm whitespace-pre-wrap break-words">{message.message}</p>
                  
                  {/* Time and read status */}
                  <div className="flex items-center justify-between mt-1">
                    <p className={`text-xs ${isMyMessage ? 'text-white/70' : 'text-gray-500'}`}>
                      {new Date(message.created_at).toLocaleTimeString()}
                    </p>
                    {message.is_read && isMyMessage && (
                      <span className="text-xs text-white/70 ml-2">✓✓</span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: 'fixed',
            top: Math.min(contextMenu.y, window.innerHeight - 80),
            left: Math.min(contextMenu.x, window.innerWidth - 180),
            zIndex: 1000
          }}
          className="bg-white rounded-lg shadow-xl border border-gray-200 py-1 min-w-[150px]"
        >
          <button
            onClick={handleEdit}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
          >
            <span>✏️</span> Edit Message
          </button>
          <button
            onClick={handleDelete}
            className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
          >
            <span>🗑️</span> Delete Message
          </button>
        </motion.div>
      )}

      {/* Attachment Preview */}
      {attachment && (
        <div className="px-4 py-2 bg-blue-50 border-t border-blue-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <File className="w-4 h-4" />
            <span>{attachment.name}</span>
          </div>
          <button
            onClick={() => setAttachment(null)}
            className="text-red-500 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200">
        {editingMessage && (
          <div className="mb-2 flex items-center justify-between bg-blue-50 px-3 py-2 rounded-lg">
            <span className="text-sm text-blue-700">Editing message...</span>
            <button
              type="button"
              onClick={() => {
                setEditingMessage(null);
                setNewMessage('');
              }}
              className="text-blue-700 hover:text-blue-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />
          {!editingMessage && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Paperclip className="w-5 h-5" />
            </button>
          )}
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={editingMessage ? "Edit your message..." : "Type a message..."}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={loading || (!newMessage.trim() && !attachment)}
            className="p-2 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-full hover:shadow-lg active:scale-95 transition-all disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
        </>
      ) : (
        /* Call History Tab */
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <CallHistory conversationId={activeConversationId} />
        </div>
      )}
    </>
  );

  if (isEmbedded) {
    // Embedded mode - no modal, no backdrop
    return (
      <>
        <div className="h-full w-full bg-white flex flex-col">
          {chatContent}
        </div>
        <PhoneNumberModal
          isOpen={showPhoneModal}
          onClose={() => setShowPhoneModal(false)}
          onSuccess={() => setShowPhoneModal(false)}
        />
      </>
    );
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, x: 400 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 400 }}
              className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-50 flex flex-col"
            >
              {chatContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <PhoneNumberModal
        isOpen={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
        onSuccess={() => setShowPhoneModal(false)}
      />

      {/* Incoming call notification */}
      <IncomingCallNotification
        conversationId={activeConversationId}
        onCallAccepted={(call) => {
          window.open(`/video-call/${call.room_id}?receive=true&conversation_id=${activeConversationId}`, '_blank');
        }}
        onCallRejected={(call) => {
          console.log('Call rejected:', call.id);
        }}
      />
    </>
  );
};

export default ChatWindow;
