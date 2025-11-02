import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Message {
  id: string;
  channel_id: string;
  user_id: string;
  content: string;
  file_url?: string | null;
  file_name?: string | null;
  file_type?: string | null;
  file_size?: number | null;
  created_at: string;
  updated_at: string;
  profiles?: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
  reactions?: Array<{
    id: string;
    emoji: string;
    user_id: string;
  }>;
}

export const useMessages = (channelId: string | undefined, currentUsername?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!channelId) {
      setLoading(false);
      return;
    }

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          reactions (id, emoji, user_id)
        `)
        .eq('channel_id', channelId)
        .order('created_at', { ascending: true });

      if (!error && data) {
        // Fetch profiles separately for each message
        const messagesWithProfiles = await Promise.all(
          data.map(async (message) => {
            const { data: profile } = await supabase
              .from('profiles')
              .select('username, display_name, avatar_url')
              .eq('id', message.user_id)
              .maybeSingle();

            return {
              ...message,
              profiles: profile,
            };
          })
        );

        setMessages(messagesWithProfiles as Message[]);
      }
      setLoading(false);
    };

    fetchMessages();

    // Subscribe to realtime message changes
    const channel = supabase
      .channel(`messages-${channelId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `channel_id=eq.${channelId}`,
        },
        async (payload) => {
          if (payload.eventType === 'DELETE') {
            setMessages(prev => prev.filter(m => m.id !== payload.old.id));
          } else if (payload.eventType === 'INSERT' && currentUsername) {
            // Check for mentions in new messages
            const newMessage = payload.new as any;
            const mentionRegex = /@(\w+)/g;
            const mentions = [...newMessage.content.matchAll(mentionRegex)].map(m => m[1]);
            
            if (mentions.includes(currentUsername)) {
              // Get current user ID to avoid self-notification
              const { data: { user } } = await supabase.auth.getUser();
              
              if (user && newMessage.user_id !== user.id) {
                // Fetch sender profile and channel name
                const { data: senderProfile } = await supabase
                  .from('profiles')
                  .select('display_name, username')
                  .eq('id', newMessage.user_id)
                  .single();
                
                const { data: channelData } = await supabase
                  .from('channels')
                  .select('name')
                  .eq('id', channelId)
                  .single();
                
                const senderName = senderProfile?.display_name || senderProfile?.username || 'Someone';
                const channelName = channelData?.name || 'unknown channel';
                const messagePreview = newMessage.content.length > 100 
                  ? newMessage.content.substring(0, 100) + '...' 
                  : newMessage.content;
                
                toast({
                  title: `${senderName} mentioned you in #${channelName}`,
                  description: messagePreview,
                });
              }
            }
            
            fetchMessages();
          } else {
            fetchMessages();
          }
        }
      )
      .subscribe();

    // Subscribe to realtime reaction changes
    const reactionChannel = supabase
      .channel(`reactions-${channelId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reactions',
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    // Global DELETE listener to ensure deleted messages disappear instantly even without replica identity full
    const deleteChannel = supabase
      .channel('messages-delete')
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          const deletedId = (payload.old as any)?.id;
          if (deletedId) {
            setMessages((prev) => prev.filter((m) => m.id !== deletedId));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(reactionChannel);
      supabase.removeChannel(deleteChannel);
    };
  }, [channelId]);

  const sendMessage = async (content: string, userId: string) => {
    if (!channelId) return;

    const { error } = await supabase.from('messages').insert({
      channel_id: channelId,
      user_id: userId,
      content,
    });

    if (error) {
      console.error('Error sending message:', error);
    }
  };

  const addReaction = async (messageId: string, emoji: string, userId: string) => {
    const { error } = await supabase.from('reactions').insert({
      message_id: messageId,
      user_id: userId,
      emoji,
    });

    if (error) {
      console.error('Error adding reaction:', error);
    }
  };

  const deleteMessage = async (messageId: string) => {
    // Optimistic update
    const prev = messages;
    setMessages((cur) => cur.filter((m) => m.id !== messageId));
    const { error } = await supabase.from('messages').delete().eq('id', messageId);
    if (error) {
      console.error('Error deleting message:', error);
      // rollback
      setMessages(prev);
    }
  };

  return { messages, loading, sendMessage, addReaction, deleteMessage };
};
