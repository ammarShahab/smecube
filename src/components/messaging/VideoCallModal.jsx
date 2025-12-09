import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Video, VideoOff, Mic, MicOff, PhoneOff, Monitor } from 'lucide-react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const VideoCallModal = ({ isOpen, onClose, roomId }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [callStatus, setCallStatus] = useState('connecting'); // connecting, ongoing, ended
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);

  useEffect(() => {
    if (isOpen && roomId) {
      initializeCall();
    }

    return () => {
      cleanupCall();
    };
  }, [isOpen, roomId]);

  const initializeCall = async () => {
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Join the call
      await api.post(`/video-calls/${roomId}/join`);
      setCallStatus('ongoing');

      // Initialize WebRTC connection
      // Note: This is a simplified version. In production, you'd use a signaling server
      // and implement proper WebRTC peer connection setup
      setupPeerConnection(stream);
    } catch (error) {
      console.error('Failed to initialize call:', error);
      alert('Failed to access camera/microphone');
    }
  };

  const setupPeerConnection = (stream) => {
    // This is a placeholder for WebRTC setup
    // In production, you would:
    // 1. Create RTCPeerConnection
    // 2. Add local tracks
    // 3. Exchange SDP offers/answers via signaling server
    // 4. Exchange ICE candidates
    // 5. Handle remote stream

    // For now, we'll just display the local stream
    console.log('WebRTC setup would happen here');
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setVideoEnabled(videoTrack.enabled);
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setAudioEnabled(audioTrack.enabled);
    }
  };

  const endCall = async () => {
    try {
      await api.post(`/video-calls/${roomId}/end`);
      cleanupCall();
      onClose();
    } catch (error) {
      console.error('Failed to end call:', error);
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

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-900 z-50 flex flex-col"
    >
      {/* Header */}
      <div className="bg-gray-800 text-white p-2 sm:p-3 md:p-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm sm:text-lg font-semibold">Video Call</h2>
          <p className="text-xs sm:text-sm text-gray-400">
            {callStatus === 'connecting' ? 'Connecting...' : 'In Call'}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1 sm:p-2 hover:bg-gray-700 rounded-full transition-colors flex-shrink-0"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Video Container */}
      <div className="flex-1 relative bg-gray-900">
        {/* Remote Video (Main) */}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />

        {/* No Remote Stream Placeholder */}
        {!remoteStream && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="text-center text-white">
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-12 h-12" />
              </div>
              <p className="text-lg">Waiting for other participant...</p>
            </div>
          </div>
        )}

        {/* Local Video (PiP) */}
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 w-32 h-24 sm:w-40 sm:h-32 md:w-48 md:h-36 bg-gray-800 rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-2xl border border-gray-700 sm:border-2"
        >
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover mirror"
          />
          {!videoEnabled && (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <VideoOff className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
            </div>
          )}
        </motion.div>

        {/* Call Duration */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 bg-black/50 backdrop-blur-sm text-white px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-full text-xs sm:text-sm font-mono">
          00:00
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-2 sm:p-3 md:p-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleVideo}
          className={`p-2 sm:p-3 md:p-4 rounded-full transition-colors ${
            videoEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {videoEnabled ? (
            <Video className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
          ) : (
            <VideoOff className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleAudio}
          className={`p-2 sm:p-3 md:p-4 rounded-full transition-colors ${
            audioEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {audioEnabled ? (
            <Mic className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
          ) : (
            <MicOff className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={endCall}
          className="p-2 sm:p-3 md:p-4 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
        >
          <PhoneOff className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 sm:p-3 md:p-4 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
        >
          <Monitor className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default VideoCallModal;
