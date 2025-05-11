import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  FileText, 
  Home, 
  MessageSquare, 
  Users, 
  Settings,
  X,
} from "lucide-react";

interface AppSidebarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    label: "Serviços",
    href: "/services",
    icon: FileText,
  },
  {
    label: "Agenda",
    href: "/agenda",
    icon: Calendar,
  },
  {
    label: "Chats",
    href: "/chats",
    icon: MessageSquare,
  },
  {
    label: "Clientes",
    href: "/clients",
    icon: Users,
  },
  {
    label: "Conectar",
    href: "/connect",
    icon: Settings,
  },
];

export function AppSidebar({ mobileMenuOpen, setMobileMenuOpen }: AppSidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      {/* Overlay para fechar o menu mobile */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar para desktop e mobile */}
      <aside 
        className={cn(
          "bg-sidebar z-50 w-64 flex-shrink-0 border-r border-sidebar-border flex flex-col",
          "transition-transform duration-300 ease-in-out",
          "fixed inset-y-0 left-0 md:relative",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-white font-bold">SB</div>
            <h1 className="text-lg font-bold text-sidebar-foreground">Smart Bot</h1>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden text-sidebar-foreground"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={20} />
          </Button>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto py-4 px-3">
          <p className="text-sidebar-foreground/70 text-xs font-medium px-3 py-2 uppercase tracking-wider">
            Menu principal
          </p>
          <nav className="space-y-1 mt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm",
                  "transition-colors duration-200",
                  currentPath === item.href
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-accent-foreground">
              BL
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">B2B Smart Labs</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">Administrador</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
