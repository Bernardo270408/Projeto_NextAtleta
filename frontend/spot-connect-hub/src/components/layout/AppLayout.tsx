import { Link, useLocation } from "react-router-dom";
import { Home, Search, PlusSquare, Heart, User, Send, Menu, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: Home, label: "Início", path: "/feed" },
  { icon: Search, label: "Explorar", path: "/explore" },
  { icon: Trophy, label: "Peneiras", path: "/tryouts" },
  { icon: Send, label: "Mensagens", path: "/messages" },
  { icon: User, label: "Perfil", path: "/profile" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === "/profile" && location.pathname.startsWith("/profile"));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 p-2 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("h-6 w-6", isActive && "fill-primary/20")} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-border bg-card md:block lg:w-72">
      <div className="flex h-full flex-col p-4">
        {/* Logo */}
        <Link to="/" className="mb-8 flex items-center gap-3 px-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
            <Trophy className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold gradient-text">SportLink</span>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path === "/profile" && location.pathname.startsWith("/profile"));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "nav-item",
                  isActive && "bg-primary text-primary-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Create Post Button */}
        <Button variant="gradient" size="lg" className="mt-4 w-full">
          <PlusSquare className="h-5 w-5" />
          <span>Nova Publicação</span>
        </Button>
      </div>
    </aside>
  );
}

export function TopNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-card/95 backdrop-blur-lg md:hidden">
      <div className="flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <Trophy className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold gradient-text">SportLink</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link to="/messages" className="relative p-2">
            <Send className="h-6 w-6" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent" />
          </Link>
          <button className="p-2">
            <Heart className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <Sidebar />
      <main className="pb-20 pt-14 md:ml-64 md:pb-0 md:pt-0 lg:ml-72">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
