import { Star, Hash, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Starred() {
  const starredItems = [
    {
      id: 1,
      type: 'message',
      user: 'Sarah Chen',
      channel: 'general',
      content: 'Don\'t forget: Team meeting at 3 PM today. We\'ll be discussing Q4 roadmap and priorities.',
      timestamp: '2024-01-15 10:30 AM',
      date: 'Yesterday'
    },
    {
      id: 2,
      type: 'message',
      user: 'Alex Kim',
      channel: 'engineering',
      content: 'API endpoint documentation: https://docs.example.com/api - bookmark this for reference',
      timestamp: '2024-01-14 2:15 PM',
      date: 'Jan 14'
    },
    {
      id: 3,
      type: 'message',
      user: 'Jordan Lee',
      channel: 'design',
      content: 'Final design system colors approved! 🎨 Primary: #FF6B35, Secondary: #004E89',
      timestamp: '2024-01-12 11:45 AM',
      date: 'Jan 12'
    },
    {
      id: 4,
      type: 'message',
      user: 'Morgan Taylor',
      channel: 'announcements',
      content: 'Company holiday schedule: Office closed Dec 24-26 and Dec 31-Jan 1',
      timestamp: '2024-01-10 9:00 AM',
      date: 'Jan 10'
    }
  ];

  return (
    <div className="flex-1 flex flex-col p-6 max-w-5xl">
        <div className="mb-6">
          <h1 className="text-3xl font-black mb-2">Starred</h1>
          <p className="text-muted-foreground">
            Important messages and items you've saved for later
          </p>
        </div>

        {starredItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-16">
            <Star className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-black mb-2">No starred items yet</h2>
            <p className="text-muted-foreground text-center max-w-md">
              Star important messages to save them here for quick access
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {starredItems.map((item) => (
              <Card key={item.id} className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-lg flex-shrink-0 border border-primary/20">
                    👤
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-bold text-[15px]">{item.user}</span>
                      <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{item.channel}</span>
                    </div>
                    <p className="text-[15px] leading-relaxed">{item.content}</p>
                  </div>
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
  );
}
