import { cn } from "@/lib/utils";
import { Home, Settings, LogOut } from "lucide-react";

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn("w-64 bg-gray-900 text-white h-screen", className)}>
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter />
    </aside>
  );
}

export function SidebarHeader() {
  return (
    <div className="p-4 text-lg font-bold border-b border-gray-700">
      App Sidebar
    </div>
  );
}

export function SidebarContent() {
  return (
    <nav className="p-4 space-y-2">
      <SidebarGroup>
        <SidebarItem icon={Home} label="Dashboard" />
        <SidebarItem icon={Settings} label="Settings" />
      </SidebarGroup>
    </nav>
  );
}

export function SidebarGroup({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2">{children}</div>;
}

export function SidebarItem({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center p-2 rounded-lg hover:bg-gray-800 cursor-pointer">
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </div>
  );
}

export function SidebarFooter() {
  return (
    <div className="p-4 mt-auto border-t border-gray-700">
      <SidebarItem icon={LogOut} label="Logout" />
    </div>
  );
}
