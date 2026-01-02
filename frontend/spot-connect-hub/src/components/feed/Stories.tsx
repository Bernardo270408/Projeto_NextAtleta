import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const mockStories = [
  {
    id: "your-story",
    name: "Seu story",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop",
    isYours: true,
    hasNew: false,
  },
  {
    id: "1",
    name: "Flamengo FC",
    avatar: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=150&h=150&fit=crop",
    isYours: false,
    hasNew: true,
    isPremium: true,
  },
  {
    id: "2",
    name: "Maria Santos",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    isYours: false,
    hasNew: true,
    isPremium: false,
  },
  {
    id: "3",
    name: "João Atleta",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    isYours: false,
    hasNew: true,
    isPremium: true,
  },
  {
    id: "4",
    name: "Ana Corrida",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    isYours: false,
    hasNew: false,
    isPremium: false,
  },
  {
    id: "5",
    name: "Lucas Natação",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    isYours: false,
    hasNew: true,
    isPremium: false,
  },
];

export function Stories() {
  return (
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
      <div className="flex gap-4">
        {mockStories.map((story) => (
          <button
            key={story.id}
            className="flex flex-col items-center gap-1.5 flex-shrink-0"
          >
            <div
              className={cn(
                "relative rounded-full p-[3px] transition-all",
                story.hasNew
                  ? "gradient-accent"
                  : story.isYours
                  ? "bg-transparent"
                  : "bg-border"
              )}
            >
              <div className="rounded-full bg-card p-[2px]">
                <Avatar className="h-16 w-16 md:h-20 md:w-20">
                  <AvatarImage src={story.avatar} alt={story.name} />
                  <AvatarFallback>{story.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              {story.isYours && (
                <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full gradient-primary ring-2 ring-card">
                  <Plus className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              {story.isPremium && !story.isYours && (
                <div className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full gradient-premium ring-2 ring-card text-[10px] font-bold text-premium-foreground">
                  ★
                </div>
              )}
            </div>
            <span className="text-xs font-medium text-muted-foreground max-w-[70px] truncate">
              {story.isYours ? "Seu story" : story.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
