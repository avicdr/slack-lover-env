import { MessageSquare, User } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Threads() {
  const sampleThreads = [
    {
      id: 1,
      title: 'Q4 Planning Discussion',
      channel: 'general',
      replies: 12,
      participants: 5,
      lastReply: '2 hours ago',
      preview: 'I think we should focus on the mobile experience first...'
    },
    {
      id: 2,
      title: 'Bug in Production',
      channel: 'engineering',
      replies: 8,
      participants: 3,
      lastReply: '4 hours ago',
      preview: 'The payment gateway is throwing errors for international...'
    },
    {
      id: 3,
      title: 'Design System Updates',
      channel: 'design',
      replies: 15,
      participants: 4,
      lastReply: '1 day ago',
      preview: 'New color palette looks amazing! Can we also update...'
    }
  ];

  return (
    <div className="flex-1 flex flex-col p-6 max-w-5xl">
        <div className="mb-6">
          <h1 className="text-3xl font-black mb-2">Threads</h1>
          <p className="text-muted-foreground">
            Follow conversations and stay up to date with threaded messages
          </p>
        </div>

        <div className="space-y-3">
          {sampleThreads.map((thread) => (
            <Card key={thread.id} className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 border border-primary/20">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-[15px]">{thread.title}</h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{thread.lastReply}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-1">#{thread.channel}</p>
                  <p className="text-sm mb-3 line-clamp-2">{thread.preview}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3.5 w-3.5" />
                      {thread.replies} replies
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {thread.participants} participants
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
  );
}
