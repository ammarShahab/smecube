import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../../services/api';
import ConversationList from '../../../components/messaging/ConversationList';
import ChatWindow from '../../../components/messaging/ChatWindow';
import NotificationBell from '../../../components/messaging/NotificationBell';
import NotificationPanel from '../../../components/messaging/NotificationPanel';
import VideoCallModal from '../../../components/messaging/VideoCallModal';

function AdminMessages() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeVideoCall, setActiveVideoCall] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSelectConversation = async (conv) => {
    console.log('Selected conversation:', conv);
    
    // If conversation id is null, create a new conversation with the user
    if (!conv || !conv.id) {
      try {
        const response = await api.post('/admin/messages/conversations', {
          user_id: conv.user_id,
        });
        
        setSelectedConversation(response.data.data);
        setChatOpen(true);
      } catch (error) {
        console.error('Failed to create conversation:', error);
        alert('Failed to create conversation. Please try again.');
      }
    } else {
      setSelectedConversation(conv);
      setChatOpen(true);
    }
  };

  // Callback when a message is sent - refresh the conversation list
  const handleMessageSent = (data) => {
    console.log('Message sent from admin:', data);
    
    // Trigger a refresh of the conversation list
    setRefreshKey(prev => prev + 1);
    
    // If the conversation was updated, update selected conversation
    if (data.conversation) {
      setSelectedConversation(data.conversation);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-2">Communication center for client messages</p>
        </div>
        <NotificationBell onClick={() => setShowNotifications(!showNotifications)} />
      </div>

      {/* Messaging Interface */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex h-[calc(100vh-200px)]">
          {/* Sidebar - Conversation List */}
          <ConversationList 
            key={refreshKey}
            onSelectConversation={handleSelectConversation}
            isAdmin={true}
          />

          {/* Chat Area */}
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            {!chatOpen ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-gray-500"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-12 h-12 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Select a conversation
                </h2>
                <p className="text-sm text-gray-500">
                  Choose a client from the list to view messages
                </p>
              </motion.div>
            ) : (
              <div className="w-full h-full">
                <ChatWindow
                  isOpen={true}
                  onClose={() => {}}
                  conversationId={selectedConversation?.id}
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

export default AdminMessages;