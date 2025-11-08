import { create } from 'zustand';

interface WorkspaceStore {
  activeChannel: string;
  sidebarCollapsed: boolean;
  channelOrder: Record<string, string[]>;
  membersSidebarOpen: boolean;
  helpSidebarOpen: boolean;
  setActiveChannel: (channelId: string) => void;
  toggleSidebar: () => void;
  toggleMembersSidebar: () => void;
  toggleHelpSidebar: () => void;
  reorderChannels: (section: string, channelIds: string[]) => void;
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  activeChannel: '',
  sidebarCollapsed: false,
  channelOrder: {},
  membersSidebarOpen: false,
  helpSidebarOpen: false,
  setActiveChannel: (channelId) => set({ activeChannel: channelId }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  toggleMembersSidebar: () => set((state) => ({ membersSidebarOpen: !state.membersSidebarOpen })),
  toggleHelpSidebar: () => set((state) => ({ helpSidebarOpen: !state.helpSidebarOpen })),
  reorderChannels: (section, channelIds) =>
    set((state) => ({
      channelOrder: { ...state.channelOrder, [section]: channelIds },
    })),
}));
