import { ChevronLeft, ChevronRight, RotateCcw, Search, HelpCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { useWorkspaceMembers } from '@/hooks/useWorkspaceMembers';

export const TopBar = () => {
  const navigate = useNavigate();
  const { toggleMembersSidebar, membersSidebarOpen } = useWorkspaceStore();
  const { totalCount } = useWorkspaceMembers();

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
            placeholder="Search New Workspace"
            className="w-full pl-10 bg-[hsl(var(--slack-purple-active))] border-[hsl(var(--slack-purple-active))] text-foreground placeholder:text-[hsl(var(--slack-text-muted))] focus-visible:ring-1 focus-visible:ring-[hsl(var(--slack-cyan))] h-8"
          />
        </div>
      </div>

      {/* Members & Help Buttons */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMembersSidebar}
          className={`h-7 px-3 text-[hsl(var(--slack-text-muted))] hover:text-foreground hover:bg-[hsl(var(--slack-purple-hover))] ${
            membersSidebarOpen ? 'bg-[hsl(var(--slack-purple-hover))] text-foreground' : ''
          }`}
        >
          <Users className="h-4 w-4 mr-1.5" />
          <span className="text-xs">{totalCount}</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-[hsl(var(--slack-text-muted))] hover:text-foreground hover:bg-[hsl(var(--slack-purple-hover))]"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};
