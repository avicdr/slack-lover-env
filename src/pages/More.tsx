import { MoreHorizontal, Settings, Users, Bell, Archive, Link, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const More = () => {
  const features = [
    { icon: Settings, title: 'Workspace Settings', description: 'Manage your workspace preferences and configurations' },
    { icon: Users, title: 'People & Teams', description: 'Invite members and organize teams' },
    { icon: Bell, title: 'Notifications', description: 'Customize your notification preferences' },
    { icon: Archive, title: 'Archives', description: 'View archived channels and messages' },
    { icon: Link, title: 'Integrations', description: 'Connect apps and services to your workspace' },
    { icon: Zap, title: 'Automations', description: 'Set up workflows and automated tasks' },
  ];

  return (
    <div className="flex-1 bg-background p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-2">More</h1>
          <p className="text-muted-foreground">Additional features and settings for your workspace</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-[hsl(var(--slack-purple-active))] flex items-center justify-center mb-3">
                  <feature.icon className="h-6 w-6 text-[hsl(var(--slack-cyan))]" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default More;
