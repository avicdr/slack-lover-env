import { ReactNode } from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Hash, Star, Bell, Archive, Trash2 } from 'lucide-react';

interface ChannelItemContextMenuProps {
  children: ReactNode;
  sections: string[];
  currentSection: string;
  onMoveToSection: (section: string) => void;
  onDelete: () => void;
}

export const ChannelItemContextMenu = ({
  children,
  sections,
  currentSection,
  onMoveToSection,
  onDelete,
}: ChannelItemContextMenuProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem>
          <Star className="mr-2 h-4 w-4" />
          <span>Add to starred</span>
        </ContextMenuItem>
        <ContextMenuItem>
          <Bell className="mr-2 h-4 w-4" />
          <span>Change notifications</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Hash className="mr-2 h-4 w-4" />
            <span>Move to section</span>
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            {sections
              .filter((section) => section !== currentSection)
              .map((section) => (
                <ContextMenuItem
                  key={section}
                  onClick={() => onMoveToSection(section)}
                >
                  {section}
                </ContextMenuItem>
              ))}
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Archive className="mr-2 h-4 w-4" />
          <span>Archive channel</span>
        </ContextMenuItem>
        <ContextMenuItem className="text-destructive" onClick={onDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete channel</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
