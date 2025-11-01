import { Phone, Video, ScreenShare, Mic, MicOff, PhoneOff, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Huddles() {
  const activeHuddles = [
    {
      id: 1,
      channel: 'engineering',
      participants: ['Sarah Chen', 'Alex Kim', 'Jordan Lee'],
      duration: '23:45',
      started: '11:30 AM'
    },
    {
      id: 2,
      channel: 'design-review',
      participants: ['Morgan Taylor', 'Casey Johnson'],
      duration: '8:12',
      started: '11:45 AM'
    }
  ];

  return (
    <div className="flex-1 flex flex-col p-6 max-w-5xl">
        <div className="mb-6">
          <h1 className="text-3xl font-black mb-2">Huddles</h1>
          <p className="text-muted-foreground">
            Instantly connect over audio or video
          </p>
        </div>

        {/* Start Huddle Section */}
        <Card className="p-8 mb-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-black mb-2">Start a Huddle</h2>
              <p className="text-muted-foreground">
                Talk it through in real time on a huddle, with screen-sharing, expressive reactions and a message thread that is automatically saved for later reference.
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="lg" className="gap-2">
                <Phone className="h-5 w-5" />
                Start huddle
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Video className="h-5 w-5" />
                With video
              </Button>
            </div>
          </div>
        </Card>

        {/* Active Huddles */}
        {activeHuddles.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-black mb-4">Active Huddles</h2>
            <div className="space-y-3">
              {activeHuddles.map((huddle) => (
                <Card key={huddle.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
                        <Phone className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-[15px]">#{huddle.channel}</h3>
                          <span className="text-xs bg-green-500/20 text-green-600 px-2 py-0.5 rounded">Live</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            {huddle.participants.length} in call
                          </span>
                          <span>{huddle.duration}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Phone className="h-4 w-4" />
                      Join
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Huddle Features */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <Video className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-bold mb-1">Video & Audio</h3>
            <p className="text-sm text-muted-foreground">
              Toggle your camera on or off during the conversation
            </p>
          </Card>
          <Card className="p-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <ScreenShare className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-bold mb-1">Screen Sharing</h3>
            <p className="text-sm text-muted-foreground">
              Share your screen to show what you're working on
            </p>
          </Card>
          <Card className="p-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <Mic className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-bold mb-1">Crystal Clear</h3>
            <p className="text-sm text-muted-foreground">
              High-quality audio for seamless communication
            </p>
          </Card>
        </div>
      </div>
  );
}
