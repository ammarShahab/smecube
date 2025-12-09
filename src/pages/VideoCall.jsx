import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

const VideoCall = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isReceiver = searchParams.get('receive') === 'true';
  const conversationId = searchParams.get('conversation_id');
  
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [volume, setVolume] = useState(100);
  const [callStatus, setCallStatus] = useState(isReceiver ? 'ringing' : 'connecting'); // ringing, connecting, ongoing, ended
  const [error, setError] = useState(null);
  const [otherUserName, setOtherUserName] = useState(isReceiver ? 'Caller' : 'Loading...');
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (roomId) {
      initializeCall();
    }

    return () => {
      cleanupCall();
    };
  }, [roomId]);

  // For receiver: fetch caller info
  useEffect(() => {
    if (isReceiver && conversationId) {
      fetchCallerInfo();
    }
  }, [isReceiver, conversationId]);

  const fetchCallerInfo = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const isAdmin = user.role === 'admin';
      const endpoint = isAdmin 
        ? `/admin/messages/conversations/${conversationId}`
        : `/messages/conversations/${conversationId}`;
      
      const response = await api.get(endpoint);
      if (response.data.data) {
        const conversation = response.data.data;
        // Get caller name (if admin is receiving, show user name, vice versa)
        const callerName = isAdmin ? conversation.user?.name : conversation.admin?.name;
        setOtherUserName(callerName || 'Caller');
      }
    } catch (error) {
      console.error('Failed to fetch caller info:', error);
    }
  };

  const initializeCall = async () => {
    try {
      setError(null);
      
      // First, check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Your browser does not support video calls. Please use Chrome, Firefox, or Safari.');
        setCallStatus('ended');
        return;
      }

      // Try to get user media with fallback constraints
      let stream;
      try {
        // Try with optimal constraints first
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });
      } catch (e) {
        // If that fails, try with minimal constraints
        console.warn('Optimal constraints failed, trying minimal:', e);
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
      }

      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Join the call
      try {
        await api.post(`/video-calls/${roomId}/join`);
        setCallStatus('ongoing');
      } catch (joinError) {
        console.error('Failed to join call:', joinError);
        // Still allow local video even if join fails
        setCallStatus('ongoing');
      }

      // Initialize WebRTC connection
      setupPeerConnection(stream);
    } catch (error) {
      console.error('Failed to initialize call:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      
      // Provide more specific error messages
      let errorMsg = 'Failed to access camera/microphone. Please check your device permissions.';
      
      if (error.name === 'NotAllowedError') {
        errorMsg = 'Permission denied. Please allow access to camera and microphone.';
      } else if (error.name === 'NotFoundError') {
        errorMsg = 'Camera or microphone not found. Please check your device.';
      } else if (error.name === 'NotReadableError') {
        errorMsg = 'Camera or microphone is already in use by another application.';
      } else if (error.name === 'SecurityError') {
        errorMsg = 'This site does not have permission to access your camera/microphone.';
      } else if (error.name === 'TypeError') {
        errorMsg = 'Invalid constraints provided to camera/microphone access.';
      }
      
      setError(errorMsg);
      setCallStatus('ended');
    }
  };

  const setupPeerConnection = (stream) => {
    // Simplified WebRTC setup
    // In production, you would implement full WebRTC with signaling
    console.log('WebRTC setup initialized');
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const endCall = async () => {
    try {
      await api.post(`/video-calls/${roomId}/end`);
    } catch (error) {
      console.error('Failed to end call:', error);
    } finally {
      cleanupCall();
      navigate('/');
    }
  };

  const cleanupCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    setLocalStream(null);
    setRemoteStream(null);
  };

  // Ringing screen for receiver
  if (isReceiver && callStatus === 'ringing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-6"
        >
          {/* Animated phone icon */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="flex justify-center"
          >
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
              <Phone className="w-12 h-12 text-blue-600" />
            </div>
          </motion.div>

          {/* Caller info */}
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Incoming Call</h1>
            <p className="text-2xl text-blue-100">{otherUserName}</p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-8 justify-center pt-8">
            {/* Accept button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCallStatus('connecting');
                initializeCall();
              }}
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl"
            >
              <Phone className="w-6 h-6" />
              Accept
            </motion.button>

            {/* Decline button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigate(-1);
              }}
              className="flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl"
            >
              <PhoneOff className="w-6 h-6" />
              Decline
            </motion.button>
          </div>

          {/* Ringing indicator */}
          <div className="flex justify-center gap-2 pt-8">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-3 h-3 bg-blue-300 rounded-full"
            />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              className="w-3 h-3 bg-blue-300 rounded-full"
            />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              className="w-3 h-3 bg-blue-300 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md text-center">
          <div className="text-4xl mb-3">⚠️</div>
          <h2 className="text-2xl font-bold text-red-700 mb-3">Call Error</h2>
          <p className="text-red-600 mb-6 text-sm leading-relaxed">{error}</p>
          <div className="space-y-2 mb-6 text-left bg-red-100 p-4 rounded text-xs text-red-700">
            <p className="font-semibold mb-2">Quick fixes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Make sure camera/microphone are not in use</li>
              <li>Check browser permissions for this site</li>
              <li>Restart your browser and try again</li>
              <li>Try using HTTPS if available</li>
            </ul>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
            >
              Retry
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Main Video Area */}
      <div className="flex-1 flex items-center justify-center p-4 gap-4">
        {/* Remote Video (if available) or Placeholder */}
        <div className="flex-1 max-w-4xl">
          {remoteStream ? (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full rounded-lg bg-black object-cover"
            />
          ) : (
            <div className="w-full aspect-video rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center">
                <Video className="w-24 h-24 text-gray-600 mx-auto mb-4 animate-pulse" />
                <p className="text-gray-400 text-lg font-medium">
                  {callStatus === 'connecting' ? 'Connecting...' : 'Waiting for other person...'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Local Video (Picture-in-Picture) */}
        <div className="w-64 h-48 rounded-lg overflow-hidden shadow-xl border-4 border-cyan-500">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full bg-black object-cover"
          />
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-gray-800 border-t border-gray-700 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Volume Control */}
          <div className="flex items-center gap-3 min-w-max">
            <Volume2 className="w-5 h-5 text-gray-400" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-gray-400 text-sm w-12">{volume}%</span>
          </div>

          {/* Center: Call Controls */}
          <div className="flex items-center gap-4">
            {/* Video Toggle */}
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full transition-all transform hover:scale-110 ${
                videoEnabled
                  ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
              title={videoEnabled ? 'Turn off camera' : 'Turn on camera'}
            >
              {videoEnabled ? (
                <Video className="w-6 h-6" />
              ) : (
                <VideoOff className="w-6 h-6" />
              )}
            </button>

            {/* Mic Toggle */}
            <button
              onClick={toggleAudio}
              className={`p-3 rounded-full transition-all transform hover:scale-110 ${
                audioEnabled
                  ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
              title={audioEnabled ? 'Mute microphone' : 'Unmute microphone'}
            >
              {audioEnabled ? (
                <Mic className="w-6 h-6" />
              ) : (
                <MicOff className="w-6 h-6" />
              )}
            </button>

            {/* End Call */}
            <button
              onClick={endCall}
              className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all transform hover:scale-110"
              title="End call"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
          </div>

          {/* Right: Status */}
          <div className="text-right min-w-max">
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  callStatus === 'ongoing'
                    ? 'bg-green-500 animate-pulse'
                    : callStatus === 'connecting'
                    ? 'bg-yellow-500 animate-pulse'
                    : 'bg-red-500'
                }`}
              />
              <span className="text-gray-300 font-medium capitalize">
                {callStatus === 'ongoing' ? 'Call Active' : 'Connecting...'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Audio element for remote stream */}
      <audio ref={audioRef} autoPlay />
    </div>
  );
};

export default VideoCall;
