import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Volume2 } from 'lucide-react';
import api from '../../services/api';
import { listenToUserNotifications } from '../../services/echo';

const IncomingCallNotification = ({ onCallAccepted, onCallRejected }) => {
    const [incomingCall, setIncomingCall] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [ringtone, setRingtone] = useState(null);
    const [seenCalls, setSeenCalls] = useState(new Set());
    const pollingIntervalRef = useRef(null);
    const audioContextRef = useRef(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.id) return;

        const userType = user.role === 'admin' ? 'admin' : 'user';

        // Listen for real-time video call events via Laravel Echo
        const unsubscribeEcho = listenToUserNotifications(user.id, userType, {
            onVideoCall: (event) => {
                console.log('[IncomingCall] Real-time video call received:', event);
                const call = event.videoCall;
                
                // Check if we haven't seen this call yet
                if (call && !seenCalls.has(call.id)) {
                    setIncomingCall(call);
                    setShowNotification(true);
                    playRingtone();
                    setSeenCalls(prev => new Set([...prev, call.id]));
                    
                    // Mark as seen on backend
                    api.post(`/incoming-calls/${call.id}/seen`).catch(console.error);
                    
                    // Auto-dismiss after 30 seconds
                    setTimeout(() => {
                        if (showNotification) {
                            handleRejectCall();
                        }
                    }, 30000);
                }
            }
        });

        // Also poll for any missed calls (backup mechanism)
        const startPolling = () => {
            pollingIntervalRef.current = setInterval(async () => {
                try {
                    const response = await api.get('/incoming-calls');
                    if (response.data.success && Array.isArray(response.data.data)) {
                        for (const call of response.data.data) {
                            if (!seenCalls.has(call.id)) {
                                console.log('[IncomingCall] Polling detected new call:', call);
                                setIncomingCall(call);
                                setShowNotification(true);
                                playRingtone();
                                setSeenCalls(prev => new Set([...prev, call.id]));
                                
                                api.post(`/incoming-calls/${call.id}/seen`).catch(console.error);
                                
                                setTimeout(() => {
                                    if (showNotification) {
                                        handleRejectCall();
                                    }
                                }, 30000);
                                break;
                            }
                        }
                    }
                } catch (error) {
                    console.log('[IncomingCall] Polling error:', error.message);
                }
            }, 3000); // Poll every 3 seconds
        };

        startPolling();

        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
            if (typeof unsubscribeEcho === 'function') {
                unsubscribeEcho();
            }
        };
    }, [seenCalls, showNotification]);

    const playRingtone = () => {
        try {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }

            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioContextRef.current = audioContext;

            let intervalId;
            const playTone = () => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = 440; // A4 note
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.5);
            };

            // Play immediately
            playTone();

            // Then loop
            intervalId = setInterval(playTone, 1500);

            setRingtone({
                stop: () => {
                    clearInterval(intervalId);
                    if (audioContextRef.current) {
                        audioContextRef.current.close();
                        audioContextRef.current = null;
                    }
                }
            });
        } catch (e) {
            console.log('[IncomingCall] Could not play ringtone:', e.message);
        }
    };

    const handleAcceptCall = () => {
        if (ringtone?.stop) {
            ringtone.stop();
        }
        setShowNotification(false);
        if (onCallAccepted && incomingCall) {
            onCallAccepted(incomingCall);
        }
    };

    const handleRejectCall = async () => {
        if (ringtone?.stop) {
            ringtone.stop();
        }
        setShowNotification(false);
        
        if (incomingCall) {
            // Mark call as missed/rejected on backend
            try {
                await api.post(`/video-calls/${incomingCall.id}/end`);
            } catch (error) {
                console.error('[IncomingCall] Failed to end call:', error);
            }
            
            if (onCallRejected) {
                onCallRejected(incomingCall);
            }
        }
        
        setIncomingCall(null);
    };

    return (
        <AnimatePresence>
            {showNotification && incomingCall && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="fixed top-4 right-4 z-50 bg-white rounded-2xl shadow-2xl border-2 border-cyan-500 p-6 w-96"
                >
                    {/* Animated ring icon */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="flex justify-center mb-4"
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                            <Phone className="w-10 h-10 text-white" />
                        </div>
                    </motion.div>

                    {/* Caller info */}
                    <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Incoming Video Call
                        </h3>
                        <p className="text-gray-600">
                            {incomingCall.initiator?.name || 'Someone'} is calling...
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-4 justify-center">
                        {/* Accept button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleAcceptCall}
                            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors shadow-lg"
                        >
                            <Phone className="w-5 h-5" />
                            Accept
                        </motion.button>

                        {/* Reject button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleRejectCall}
                            className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                        >
                            <PhoneOff className="w-5 h-5" />
                            Decline
                        </motion.button>
                    </div>

                    {/* Sound indicator */}
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Volume2 className="w-4 h-4 animate-pulse" />
                        Ringing...
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IncomingCallNotification;