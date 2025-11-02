import { Files as FilesIcon, FileText, Image, Video, Music, Archive, Search, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Files = () => {
  const sampleFiles = [
    { id: 1, name: 'Project Proposal.pdf', type: 'pdf', size: '2.4 MB', channel: 'general', user: 'Sarah Johnson', date: '2 days ago', icon: FileText },
    { id: 2, name: 'Design Mockup.png', type: 'image', size: '1.8 MB', channel: 'design', user: 'Mike Chen', date: '3 days ago', icon: Image },
    { id: 3, name: 'Meeting Recording.mp4', type: 'video', size: '45.2 MB', channel: 'general', user: 'Emily Davis', date: '1 week ago', icon: Video },
    { id: 4, name: 'Presentation.pptx', type: 'document', size: '5.6 MB', channel: 'announcements', user: 'Alex Rodriguez', date: '1 week ago', icon: FileText },
    { id: 5, name: 'Brand Assets.zip', type: 'archive', size: '12.3 MB', channel: 'design', user: 'Lisa Wang', date: '2 weeks ago', icon: Archive },
    { id: 6, name: 'Logo-Final.svg', type: 'image', size: '240 KB', channel: 'design', user: 'Sarah Johnson', date: '2 weeks ago', icon: Image },
  ];

  return (
    <div className="flex-1 bg-background flex flex-col">
      <div className="border-b border-border p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-black mb-1">Files</h1>
              <p className="text-sm text-muted-foreground">All your shared files in one place</p>
            </div>
            <Button size="sm" className="gap-2">
              <FilesIcon className="h-4 w-4" />
              Upload File
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search files..." 
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="max-w-6xl mx-auto p-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Files</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-2">
              {sampleFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-[hsl(var(--slack-purple-hover))] transition-colors"
                >
                  <div className="w-12 h-12 rounded bg-[hsl(var(--slack-purple-active))] flex items-center justify-center flex-shrink-0">
                    <file.icon className="h-6 w-6 text-[hsl(var(--slack-cyan))]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[15px] truncate mb-1">{file.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>#{file.channel}</span>
                      <span>•</span>
                      <span>Shared by {file.user}</span>
                      <span>•</span>
                      <span>{file.date}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="flex-shrink-0">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="images">
              <p className="text-muted-foreground text-center py-8">Image files will appear here</p>
            </TabsContent>
            
            <TabsContent value="documents">
              <p className="text-muted-foreground text-center py-8">Document files will appear here</p>
            </TabsContent>
            
            <TabsContent value="videos">
              <p className="text-muted-foreground text-center py-8">Video files will appear here</p>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Files;
