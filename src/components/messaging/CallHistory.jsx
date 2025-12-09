import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Video, Calendar, Clock, User } from 'lucide-react';
import api from '../../services/api';

const CallHistory = ({ conversationId }) => {
  const [calls, setCall] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCallHistory();
  }, [conversationId]);

  const fetchCallHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // If no conversationId, fetch general history
      let endpoint = '/call-history/';
      if (conversationId) {
        endpoint = `/call-history/conversation/${conversationId}`;
      }
      
      console.log('[CallHistory] Fetching from:', endpoint);
      const response = await api.get(endpoint);
      console.log('[CallHistory] Response:', response.data);
      
      if (response.data && response.data.success) {
        const callData = response.data.data;
        // Handle both paginated and non-paginated responses
        let callsArray = [];
        if (Array.isArray(callData)) {
          callsArray = callData;
        } else if (callData && typeof callData === 'object') {
          callsArray = callData.data || [];
        }
        
        console.log('[CallHistory] Calls loaded:', callsArray.length);
        setCall(callsArray);
      } else {
        const msg = response.data?.message || 'Failed to load call history';
        console.error('[CallHistory] Error:', msg);
        setError(msg);
      }
    } catch (err) {
      console.error('[CallHistory] Exception:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to load call history';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ended':
        return 'bg-green-100 text-green-800';
      case 'missed':
        return 'bg-red-100 text-red-800';
      case 'initiated':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ended':
        return '✓';
      case 'missed':
        return '✕';
      case 'initiated':
        return '⏳';
      default:
        return '○';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin">
          <Video className="w-8 h-8 text-blue-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
        {error}
      </div>
    );
  }

  if (calls.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <Video className="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p>No call history yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Call History</h3>
      
      {calls.map((call, index) => (
        <motion.div
          key={call.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between">
            {/* Left: Call Info */}
            <div className="flex items-center gap-3 flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                call.status === 'ended' ? 'bg-green-500' :
                call.status === 'missed' ? 'bg-red-500' :
                'bg-yellow-500'
              }`}>
                {getStatusIcon(call.status)}
              </div>
              
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  {call.initiator?.name || 'Unknown'}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(call.created_at)}
                </p>
              </div>
            </div>

            {/* Middle: Duration */}
            <div className="text-center px-4">
              <div className="flex items-center gap-1 text-gray-600 text-sm">
                <Clock className="w-4 h-4" />
                <span>{formatDuration(call.duration_seconds)}</span>
              </div>
            </div>

            {/* Right: Status Badge */}
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(call.status)}`}>
              {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
            </div>
          </div>

          {/* Call Type */}
          <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
            <Video className="w-3 h-3" />
            <span>Video Call</span>
            {call.conversation?.subject && (
              <>
                <span>•</span>
                <span>{call.conversation.subject}</span>
              </>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CallHistory;
