import { X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { useWorkspaceMembers } from '@/hooks/useWorkspaceMembers';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const MembersSidebar = () => {
  const { membersSidebarOpen, toggleMembersSidebar } = useWorkspaceStore();
  const { members, loading, activeCount } = useWorkspaceMembers();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const filteredMembers = members.filter(
    (member) =>
      member.username.toLowerCase().includes(search.toLowerCase()) ||
      member.display_name?.toLowerCase().includes(search.toLowerCase())
  );

  const activeMembers = filteredMembers.filter((m) => m.isOnline);
  const inactiveMembers = filteredMembers.filter((m) => !m.isOnline);

  const handleMemberClick = async (memberId: string, displayName: string) => {
    if (!user || memberId === user.id) return;

    try {
      // Check if DM already exists
      const { data: existingChannels } = await supabase
        .from('channels')
        .select('id')
        .eq('type', 'dm')
        .contains('dm_users', [user.id, memberId]);

      if (existingChannels && existingChannels.length > 0) {
        navigate(`/c/${existingChannels[0].id}`);
        return;
      }

      // Create new DM
      const { data, error } = await supabase
        .from('channels')
        .insert({
          name: displayName,
          type: 'dm',
          section: 'Direct messages',
          created_by: user.id,
          dm_users: [user.id, memberId],
        })
        .select()
        .single();

      if (error) throw error;

      toast.success(`Started conversation with ${displayName}`);
      navigate(`/c/${data.id}`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to start conversation');
    }
  };

  if (!membersSidebarOpen) return null;

  return (
    <aside className="w-64 bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="h-[44px] border-b border-border px-4 flex items-center justify-between">
        <h2 className="font-semibold text-sm">Members</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMembersSidebar}
          className="h-7 w-7"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
      </div>

      {/* Members List */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-4">
          {/* Active Members */}
          {activeMembers.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground mb-2 px-2">
                Active — {activeMembers.length}
              </h3>
              <div className="space-y-1">
                {activeMembers.map((member) => (
                  <button
                    key={member.id}
                    onClick={() =>
                      handleMemberClick(
                        member.id,
                        member.display_name || member.username
                      )
                    }
                    className="w-full flex items-center gap-3 px-2 py-1.5 rounded hover:bg-muted transition-colors"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 rounded bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-sm border border-primary/20 overflow-hidden">
                        {member.avatar_url ? (
                          <img
                            src={member.avatar_url}
                            alt={member.username}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          '👤'
                        )}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="text-sm font-medium truncate">
                        {member.display_name || member.username}
                      </div>
                      {member.display_name && (
                        <div className="text-xs text-muted-foreground truncate">
                          @{member.username}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Inactive Members */}
          {inactiveMembers.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground mb-2 px-2">
                Offline — {inactiveMembers.length}
              </h3>
              <div className="space-y-1">
                {inactiveMembers.map((member) => (
                  <button
                    key={member.id}
                    onClick={() =>
                      handleMemberClick(
                        member.id,
                        member.display_name || member.username
                      )
                    }
                    className="w-full flex items-center gap-3 px-2 py-1.5 rounded hover:bg-muted transition-colors"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 rounded bg-gradient-to-br from-muted/20 to-muted/5 flex items-center justify-center text-sm border border-border overflow-hidden opacity-60">
                        {member.avatar_url ? (
                          <img
                            src={member.avatar_url}
                            alt={member.username}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          '👤'
                        )}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-muted-foreground rounded-full border-2 border-card" />
                    </div>
                    <div className="flex-1 text-left min-w-0 opacity-60">
                      <div className="text-sm font-medium truncate">
                        {member.display_name || member.username}
                      </div>
                      {member.display_name && (
                        <div className="text-xs text-muted-foreground truncate">
                          @{member.username}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              Loading members...
            </div>
          )}

          {!loading && filteredMembers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No members found
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
};
