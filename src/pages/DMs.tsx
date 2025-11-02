import { MessageSquare, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

const DMs = () => {
  const sampleDMs = [
    { id: 1, name: 'Sarah Johnson', status: 'online', lastMessage: 'Thanks for the update!', time: '2m ago', unread: 2 },
    { id: 2, name: 'Mike Chen', status: 'away', lastMessage: 'Can we discuss the project?', time: '1h ago', unread: 0 },
    { id: 3, name: 'Emily Davis', status: 'offline', lastMessage: 'See you tomorrow!', time: '3h ago', unread: 0 },
    { id: 4, name: 'Alex Rodriguez', status: 'online', lastMessage: 'Great work on the presentation', time: '5h ago', unread: 1 },
    { id: 5, name: 'Lisa Wang', status: 'online', lastMessage: 'Let me know when you\'re free', time: 'Yesterday', unread: 0 },
  ];

  const statusColors = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    offline: 'bg-gray-400',
  };

  return (
    <div className="flex-1 bg-background flex flex-col">
      <div className="border-b border-border p-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-black">Direct Messages</h1>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New Message
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search direct messages..." 
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="max-w-5xl mx-auto p-4 space-y-1">
          {sampleDMs.map((dm) => (
            <div
              key={dm.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[hsl(var(--slack-purple-hover))] cursor-pointer transition-colors"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/30">
                  👤
                </div>
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${statusColors[dm.status as keyof typeof statusColors]}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[15px] truncate">{dm.name}</span>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{dm.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground truncate flex-1">{dm.lastMessage}</p>
                  {dm.unread > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full px-2 py-0.5 flex-shrink-0">
                      {dm.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DMs;
