import { Heart, MessageSquare, AtSign, UserPlus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';

export default function Activity() {
  const activities = [
    {
      id: 1,
      type: 'reaction',
      user: 'Sarah Chen',
      action: 'reacted with ❤️ to your message',
      message: '"Great work on the new feature!"',
      time: '5 minutes ago',
      icon: Heart,
      iconColor: 'text-red-500'
    },
    {
      id: 2,
      type: 'mention',
      user: 'Alex Kim',
      action: 'mentioned you in',
      channel: '#engineering',
      message: '"@you can you review this PR?"',
      time: '1 hour ago',
      icon: AtSign,
      iconColor: 'text-blue-500'
    },
    {
      id: 3,
      type: 'reply',
      user: 'Jordan Lee',
      action: 'replied to your thread',
      message: '"I agree, let\'s schedule a meeting"',
      time: '2 hours ago',
      icon: MessageSquare,
      iconColor: 'text-primary'
    },
    {
      id: 4,
      type: 'reaction',
      user: 'Morgan Taylor',
      action: 'reacted with 🎉 to your message',
      message: '"Project launched successfully!"',
      time: '3 hours ago',
      icon: Heart,
      iconColor: 'text-yellow-500'
    },
    {
      id: 5,
      type: 'join',
      user: 'Casey Johnson',
      action: 'joined',
      channel: '#design',
      time: '5 hours ago',
      icon: UserPlus,
      iconColor: 'text-green-500'
    }
  ];

  return (
    <div className="flex-1 flex flex-col p-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-black mb-2">Activity</h1>
          <p className="text-muted-foreground">
            Catch up on mentions, reactions, and updates
          </p>
        </div>

        <div className="space-y-2">
          {activities.map((activity) => (
            <Card key={activity.id} className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="flex gap-3">
                <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${activity.iconColor}`}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm">
                      <span className="font-semibold">{activity.user}</span>
                      {' '}{activity.action}
                      {activity.channel && <span className="text-primary"> {activity.channel}</span>}
                    </p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                  </div>
                  {activity.message && (
                    <p className="text-sm text-muted-foreground italic">{activity.message}</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
  );
}
