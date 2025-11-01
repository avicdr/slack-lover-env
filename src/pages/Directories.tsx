import { Users, Hash, Mail } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Directories() {
  const people = [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'Product Manager',
      email: 'sarah@example.com',
      status: 'online',
      avatar: '👩‍💼'
    },
    {
      id: 2,
      name: 'Alex Kim',
      title: 'Senior Engineer',
      email: 'alex@example.com',
      status: 'online',
      avatar: '👨‍💻'
    },
    {
      id: 3,
      name: 'Jordan Lee',
      title: 'UX Designer',
      email: 'jordan@example.com',
      status: 'away',
      avatar: '🎨'
    },
    {
      id: 4,
      name: 'Morgan Taylor',
      title: 'Marketing Lead',
      email: 'morgan@example.com',
      status: 'offline',
      avatar: '📢'
    }
  ];

  const channels = [
    { id: 1, name: 'general', description: 'Company-wide announcements', members: 24, type: 'public' },
    { id: 2, name: 'engineering', description: 'Engineering team discussions', members: 12, type: 'public' },
    { id: 3, name: 'design', description: 'Design critiques and resources', members: 8, type: 'public' },
    { id: 4, name: 'marketing', description: 'Marketing campaigns and analytics', members: 6, type: 'private' }
  ];

  return (
    <div className="flex-1 flex flex-col p-6 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-black mb-2">Directory</h1>
          <p className="text-muted-foreground">
            Find people and channels in your workspace
          </p>
        </div>

        <Tabs defaultValue="people" className="flex-1">
          <TabsList className="mb-6">
            <TabsTrigger value="people">People</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
          </TabsList>

          <TabsContent value="people" className="space-y-4">
            <Input
              placeholder="Search people..."
              className="max-w-md"
            />
            <div className="grid gap-4 md:grid-cols-2">
              {people.map((person) => (
                <Card key={person.id} className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-2xl border border-primary/20">
                        {person.avatar}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
                        person.status === 'online' ? 'bg-green-500' :
                        person.status === 'away' ? 'bg-yellow-500' :
                        'bg-muted'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[15px] mb-0.5">{person.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{person.title}</p>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs">
                          <Mail className="h-3.5 w-3.5" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="channels" className="space-y-4">
            <Input
              placeholder="Search channels..."
              className="max-w-md"
            />
            <div className="space-y-2">
              {channels.map((channel) => (
                <Card key={channel.id} className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 border border-primary/20">
                      <Hash className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-[15px]">#{channel.name}</h3>
                        {channel.type === 'private' && (
                          <span className="text-xs bg-muted px-2 py-0.5 rounded">Private</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{channel.description}</p>
                      <div className="flex items-center gap-2">
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{channel.members} members</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Join</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
  );
}
