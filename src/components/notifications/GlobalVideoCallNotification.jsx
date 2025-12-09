import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Volume2 } from 'lucide-react';
import api from '../../services/api';
import { listenToUserNotifications } from '../../services/echo';

const GlobalVideoCallNotification = () => {
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
        console.log('[GlobalVideoCall] Initializing notifications for', userType, user.id);

        // Listen for real-time video call events via Laravel Echo
        const unsubscribeEcho = listenToUserNotifications(user.id, userType, {
            onVideoCall: (event) => {
                console.log('[GlobalVideoCall] Real-time video call received:', event);
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
                        setShowNotification(false);
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
                                console.log('[GlobalVideoCall] Polling detected new call:', call);
                                setIncomingCall(call);
                                setShowNotification(true);
                                playRingtone();
                                setSeenCalls(prev => new Set([...prev, call.id]));
                                
                                api.post(`/incoming-calls/${call.id}/seen`).catch(console.error);
                                
                                setTimeout(() => {
                                    setShowNotification(false);
                                }, 30000);
                                break;
                            }
                        }
                    }
                } catch (error) {
                    console.log('[GlobalVideoCall] Polling error:', error.message);
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
    }, [seenCalls]);

    const playRingtone = () => {
        try {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }

            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioContextRef.current = audioContext;

            // Create a simple ring tone using Web Audio API
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);

            // Ring pattern: 0.5s on, 0.5s off, repeat
            let isOn = true;
            const ringInterval = setInterval(() => {
                isOn = !isOn;
                gainNode.gain.setValueAtTime(isOn ? 0.3 : 0, audioContext.currentTime);
            }, 500);

            oscillator.start();

            setTimeout(() => {
                clearInterval(ringInterval);
                oscillator.stop();
                if (audioContextRef.current) {
                    audioContextRef.current.close();
                    audioContextRef.current = null;
                }
            }, 30000); // Stop after 30 seconds
        } catch (error) {
            console.error('Error playing ringtone:', error);
        }
    };

    const handleAcceptCall = async () => {
        try {
            if (incomingCall) {
                await api.post(`/incoming-calls/${incomingCall.id}/accept`);
                window.open(`/video-call/${incomingCall.room_id}?receive=true`, '_blank');
                setShowNotification(false);
            }
        } catch (error) {
            console.error('Error accepting call:', error);
        }
    };

    const handleRejectCall = async () => {
        try {
            if (incomingCall) {
                await api.post(`/incoming-calls/${incomingCall.id}/reject`);
            }
        } catch (error) {
            console.error('Error rejecting call:', error);
        } finally {
            setShowNotification(false);
        }
    };

    return (
        <AnimatePresence>
            {showNotification && incomingCall && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    className="fixed top-4 right-4 z-50 max-w-sm"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-2xl p-6 text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Incoming Video Call</h3>
                                <p className="text-sm text-white/80">
                                    {incomingCall.caller_name || 'Unknown'}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleAcceptCall}
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-full flex items-center justify-center gap-2 transition-all transform hover:scale-105"
                            >
                                <Phone className="w-5 h-5" />
                                Accept
                            </button>
                            <button
                                onClick={handleRejectCall}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-full flex items-center justify-center gap-2 transition-all transform hover:scale-105"
                            >
                                <PhoneOff className="w-5 h-5" />
                                Reject
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlobalVideoCallNotification;
