import { ReactNode } from 'react';
import { MainSidebar } from './MainSidebar';
import { WorkspaceSidebar } from './WorkspaceSidebar';
import { MembersSidebar } from './MembersSidebar';
import { TopBar } from './TopBar';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <MainSidebar />
      <WorkspaceSidebar />
      <main className="flex-1 flex flex-col">
        <TopBar />
        {children}
      </main>
      <MembersSidebar />
    </div>
  );
};
