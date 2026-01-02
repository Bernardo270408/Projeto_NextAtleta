import { Heart, MessageCircle, Bookmark, Share2, MoreHorizontal, Send } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface PostCardProps {
  user: {
    name: string;
    username: string;
    avatar: string;
    isPremium?: boolean;
    sport?: string;
  };
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
  isLiked?: boolean;
}

export function PostCard({
  user,
  image,
  caption,
  likes,
  comments,
  timeAgo,
  isLiked: initialIsLiked = false,
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <article className="card-elevated overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className={cn("rounded-full p-[2px]", user.isPremium ? "gradient-premium" : "bg-border")}>
            <Avatar className="h-10 w-10 border-2 border-card">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{user.username}</span>
              {user.isPremium && <span className="premium-badge">PRO</span>}
            </div>
            {user.sport && (
              <span className="text-xs text-muted-foreground">{user.sport}</span>
            )}
          </div>
        </div>
        <button className="p-2 hover:bg-muted rounded-full transition-colors">
          <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt="Post"
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          onDoubleClick={handleLike}
        />
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={cn(
                "transition-all duration-200 hover:scale-110 active:scale-95",
                isLiked && "text-accent"
              )}
            >
              <Heart
                className={cn("h-6 w-6", isLiked && "fill-accent")}
              />
            </button>
            <button 
              onClick={() => setShowComments(!showComments)}
              className="transition-all duration-200 hover:scale-110"
            >
              <MessageCircle className="h-6 w-6" />
            </button>
            <button className="transition-all duration-200 hover:scale-110">
              <Send className="h-6 w-6" />
            </button>
          </div>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="transition-all duration-200 hover:scale-110"
          >
            <Bookmark className={cn("h-6 w-6", isSaved && "fill-foreground")} />
          </button>
        </div>

        {/* Likes */}
        <p className="font-semibold mb-2">
          {likeCount.toLocaleString("pt-BR")} curtidas
        </p>

        {/* Caption */}
        <p className="text-sm">
          <span className="font-semibold mr-2">{user.username}</span>
          {caption}
        </p>

        {/* Comments count */}
        <button 
          onClick={() => setShowComments(!showComments)}
          className="text-sm text-muted-foreground mt-2 hover:text-foreground transition-colors"
        >
          Ver todos os {comments} comentários
        </button>

        {/* Time */}
        <p className="text-xs text-muted-foreground mt-2">{timeAgo}</p>

        {/* Comment input */}
        {showComments && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border animate-fade-in">
            <input
              type="text"
              placeholder="Adicione um comentário..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <Button variant="ghost" size="sm" className="text-primary font-semibold">
              Publicar
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
