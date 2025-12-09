import { useState } from 'react';
import { motion } from 'framer-motion';
import ConversationList from '../components/messaging/ConversationList';
import ChatWindow from '../components/messaging/ChatWindow';
import NotificationBell from '../components/messaging/NotificationBell';
import NotificationPanel from '../components/messaging/NotificationPanel';
import VideoCallModal from '../components/messaging/VideoCallModal';

const MessagingPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeVideoCall, setActiveVideoCall] = useState(null);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Conversation List */}
      <ConversationList onSelectConversation={setSelectedConversation} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <NotificationBell onClick={() => setShowNotifications(!showNotifications)} />
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex items-center justify-center">
          {selectedConversation ? (
            <ChatWindow
              isOpen={true}
              onClose={() => setSelectedConversation(null)}
              conversationId={selectedConversation.id}
            />
          ) : (
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
                Choose a conversation from the list or start a new one
              </p>
            </motion.div>
          )}
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
};

export default MessagingPage;
