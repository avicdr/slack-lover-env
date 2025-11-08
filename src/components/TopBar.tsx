import { ChevronLeft, ChevronRight, RotateCcw, Search, HelpCircle, Gift, MoreVertical, X, Bell, Clock, Smile, Video, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';

export const TopBar = () => {
  const navigate = useNavigate();
  const { helpSidebarOpen, toggleHelpSidebar } = useWorkspaceStore();
  const { user, signOut } = useAuth();
  const { profile } = useProfile(user?.id);

  const handleBack = () => {
    navigate(-1);
  };

  const handleForward = () => {
    navigate(1);
  };

  return (
    <header className="h-[44px] bg-[hsl(var(--slack-purple))] border-b border-[hsl(var(--slack-purple-active))] flex items-center justify-between px-3 gap-3">
      {/* Navigation Buttons */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="h-7 w-7 text-[hsl(var(--slack-text-muted))] hover:text-foreground hover:bg-[hsl(var(--slack-purple-hover))]"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleForward}
          className="h-7 w-7 text-[hsl(var(--slack-text-muted))] hover:text-foreground hover:bg-[hsl(var(--slack-purple-hover))]"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.location.reload()}
          className="h-7 w-7 text-[hsl(var(--slack-text-muted))] hover:text-foreground hover:bg-[hsl(var(--slack-purple-hover))]"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(var(--slack-text-muted))]" />
          <Input
            type="text"
            placeholder="Search Debugging Demons"
            className="w-full pl-10 bg-[hsl(var(--slack-purple-active))] border-[hsl(var(--slack-purple-active))] text-foreground placeholder:text-[hsl(var(--slack-text-muted))] focus-visible:ring-1 focus-visible:ring-[hsl(var(--slack-cyan))] h-8"
          />
        </div>
      </div>

      {/* Help & Profile Buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleHelpSidebar}
          className="h-7 px-3 text-foreground hover:bg-[hsl(var(--slack-purple-hover))]"
        >
          Help
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="bg-primary/20 text-foreground">
                  {profile?.display_name?.[0] || profile?.username?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 bg-[#1A1D21] border-[#424242] z-50">
            <div className="px-3 py-3 border-b border-[#424242]">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="bg-primary/20">
                    {profile?.display_name?.[0] || profile?.username?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-foreground truncate">
                    {profile?.display_name || profile?.username || 'User'}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span>Active</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-1">
              <DropdownMenuItem className="cursor-pointer">
                <Smile className="mr-2 h-4 w-4" />
                Update your status
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="bg-[#424242]" />
            <div className="py-1">
              <DropdownMenuItem className="cursor-pointer">
                Set yourself as away
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <span className="mr-2">Pause notifications</span>
                <span className="ml-auto text-xs text-muted-foreground">On</span>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="bg-[#424242]" />
            <div className="py-1">
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Preferences
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="bg-[#424242]" />
            <div className="py-1">
              <DropdownMenuItem 
                className="cursor-pointer text-foreground"
                onClick={async () => {
                  await signOut();
                  navigate('/');
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out of Debugging Demons
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
