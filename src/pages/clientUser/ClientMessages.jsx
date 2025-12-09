import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import ChatWindow from '../../components/messaging/ChatWindow';
import NotificationBell from '../../components/messaging/NotificationBell';
import NotificationPanel from '../../components/messaging/NotificationPanel';
import VideoCallModal from '../../components/messaging/VideoCallModal';
import { MessageSquare } from 'lucide-react';

function ClientMessages() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeVideoCall, setActiveVideoCall] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load existing conversation on mount
  useEffect(() => {
    loadConversation();
  }, []);

  const loadConversation = async () => {
    try {
      const response = await api.get('/messages/conversations');
      
      // Get the first (support) conversation if it exists
      if (response.data.success && response.data.data.length > 0) {
        const supportConversation = response.data.data[0];
        setConversation(supportConversation);
        console.log('Loaded existing conversation:', supportConversation);
      }
    } catch (error) {
      console.error('Failed to load conversation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChat = () => {
    setChatOpen(true);
  };

  // Callback when a message is sent and conversation is created/updated
  const handleMessageSent = (data) => {
    console.log('Message sent callback:', data);
    
    // If a new conversation was created, update our state
    if (data.conversation) {
      setConversation(data.conversation);
      console.log('Updated conversation:', data.conversation);
    }
    
    // If a new conversation ID is provided
    if (data.newConversationId) {
      // Reload the conversation to get full details
      loadConversation();
    }
  };

  return (
    <div className="fixed left-0 md:left-64 right-0 bg-gradient-to-br from-cyan-50 to-teal-50 overflow-hidden px-6 pb-2" style={{ top: '73px', bottom: '0' }}>
      {/* Main Content - Two Column Layout */}
      <div className="h-full pt-2">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex h-full">
          
          {/* Left Sidebar - Support Contact */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-cyan-50 to-teal-50">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Support Chat</h1>
                  <p className="text-xs text-gray-600 mt-1">Chat with our support team</p>
                </div>
                <NotificationBell onClick={() => setShowNotifications(!showNotifications)} />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {/* Support System Contact */}
              <motion.div
                whileHover={{ backgroundColor: '#ecfeff' }}
                onClick={handleOpenChat}
                className={`p-3 border-b border-gray-100 cursor-pointer transition-colors ${
                  chatOpen ? 'bg-cyan-50' : 'hover:bg-cyan-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">Support System</h3>
                    <p className="text-xs text-gray-600">Online • Always available</p>
                  </div>
                  {conversation && conversation.unread_count > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conversation.unread_count}
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side - Chat Area */}
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            {!chatOpen ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-gray-500"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-12 h-12 text-cyan-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Welcome to Support Chat
                </h2>
                <p className="text-sm text-gray-500">
                  Click on "Support System" to start chatting
                </p>
              </motion.div>
            ) : (
              <div className="w-full h-full">
                <ChatWindow
                  isOpen={true}
                  onClose={() => {}}
                  conversationId={conversation?.id}
                  isEmbedded={true}
                  onMessageSent={handleMessageSent}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      {/* Video Call Modal */}
      {activeVideoCall && (
        <VideoCallModal
          isOpen={true}
          onClose={() => setActiveVideoCall(null)}
          roomId={activeVideoCall}
        />
      )}
    </div>
  );
}

export default ClientMessages;