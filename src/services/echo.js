import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
    authEndpoint: `${import.meta.env.VITE_API_URL}/broadcasting/auth`,
    auth: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
        },
    },
});

// Listen to conversation events
export const listenToConversation = (conversationId, callbacks = {}) => {
    const channelName = `conversation.${conversationId}`;
    console.log('[Echo] Listening to channel:', channelName);
    
    const channel = echo.private(channelName);

    // Listen for new messages
    if (callbacks.onMessageSent) {
        channel.listen('MessageSent', (event) => {
            console.log('[Echo] MessageSent event received:', event);
            callbacks.onMessageSent(event);
        });
    }

    // Listen for video call initiation
    if (callbacks.onVideoCallInitiated) {
        channel.listen('VideoCallInitiated', (event) => {
            console.log('[Echo] VideoCallInitiated event received:', event);
            callbacks.onVideoCallInitiated(event);
        });
    }

    // Return unsubscribe function
    return () => {
        console.log('[Echo] Unsubscribing from channel:', channelName);
        echo.leave(channelName);
    };
};

// Listen to user-specific notifications (for admin or user)
export const listenToUserNotifications = (userId, userType = 'user', callbacks = {}) => {
    const channelName = userType === 'admin' 
        ? `admin.${userId}` 
        : `user.${userId}`;
    
    console.log('[Echo] Listening to notifications channel:', channelName);
    
    const channel = echo.private(channelName);

    // Listen for video call notifications
    if (callbacks.onVideoCall) {
        channel.listen('VideoCallInitiated', (event) => {
            console.log('[Echo] Video call notification received:', event);
            callbacks.onVideoCall(event);
        });
    }

    // Listen for message notifications
    if (callbacks.onMessage) {
        channel.listen('MessageSent', (event) => {
            console.log('[Echo] Message notification received:', event);
            callbacks.onMessage(event);
        });
    }

    // Return unsubscribe function
    return () => {
        console.log('[Echo] Unsubscribing from notifications channel:', channelName);
        echo.leave(channelName);
    };
};

export default echo;