import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface WorkspaceMember {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  isOnline?: boolean;
}

export const useWorkspaceMembers = () => {
  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let presenceChannel: RealtimeChannel;

    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, display_name, avatar_url')
        .order('username', { ascending: true });

      if (!error && data) {
        setMembers(data);
      }
      setLoading(false);
    };

    const setupPresence = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      presenceChannel = supabase.channel('workspace-presence');

      presenceChannel
        .on('presence', { event: 'sync' }, () => {
          const state = presenceChannel.presenceState();
          const online = new Set<string>();
          Object.values(state).forEach((presences: any) => {
            presences.forEach((presence: any) => {
              if (presence.user_id) {
                online.add(presence.user_id);
              }
            });
          });
          setOnlineUsers(online);
        })
        .on('presence', { event: 'join' }, ({ key, newPresences }) => {
          console.log('User joined:', key, newPresences);
        })
        .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
          console.log('User left:', key, leftPresences);
        })
        .subscribe(async (status) => {
          if (status === 'SUBSCRIBED') {
            await presenceChannel.track({
              user_id: user.id,
              online_at: new Date().toISOString(),
            });
          }
        });
    };

    fetchMembers();
    setupPresence();

    return () => {
      if (presenceChannel) {
        supabase.removeChannel(presenceChannel);
      }
    };
  }, []);

  const membersWithStatus = members.map(member => ({
    ...member,
    isOnline: onlineUsers.has(member.id),
  }));

  return { 
    members: membersWithStatus, 
    loading,
    activeCount: onlineUsers.size,
    totalCount: members.length,
  };
};
