// components/ui/Sidebar.tsx
import { cn } from "@/lib/utils";
import { Home, Settings, Users, Box, FileText, ShoppingCart, Calendar } from "lucide-react"; // Import additional icons
import Link from "next/link"; // Import Link from Next.js

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn("flex flex-col w-28 bg-zinc-900 text-white h-screen rounded-r-lg", className)}>
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter />
    </aside>
  );
}

export function SidebarHeader() {
  return (
    <div className="p-4 text-lg  font-bold text-pink-300 border-b border-gray-700">
      COSYPOS
    </div>
  );
}

export function SidebarContent() {
  return (
    <nav className="p-4 flex-grow">
      <SidebarGroup>
        <SidebarItem icon={Home} label="Dashboard" href="/dashboard" />
        <SidebarItem icon={Box} label="Menu" href="/menu" />
        <SidebarItem icon={Users} label="Staff" href="/staff" />
        <SidebarItem icon={Users} label="Inventory" href="/inventory" />
        <SidebarItem icon={FileText} label="Reports" href="/reports" />
        <SidebarItem icon={ShoppingCart} label="Orders/Table" href="/orders" />
        <SidebarItem icon={Calendar} label="Reservation" href="/reservation" />
      </SidebarGroup>
    </nav>
  );
}

export function SidebarGroup({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4">{children}</div>;
}

export function SidebarItem({ icon: Icon, label, href }: { icon: any; label: string; href: string }) {
  return (
    <Link href={href} className="flex flex-col items-center p-1 rounded-lg hover:bg-pink-300 cursor-pointer hover:text-black border-b border-transparent mb-4"> {/* Increased gap with mb-4 */}
      <Icon className="w-5 h-5 mb-1" />
      <span className="text-xs">{label}</span>
      <div className="border-b border-transparent" /> {/* Added transparent line below each item */}
    </Link>
  );
}

export function SidebarFooter() {
  return (
    <div className="p-4 border-t border-gray-700 mt-auto">
      <SidebarItem icon={Settings} label="Logout" href="/logout" />
    </div>
  );
}