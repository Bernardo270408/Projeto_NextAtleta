import { AppLayout } from "@/components/layout/AppLayout";
import { PostCard } from "@/components/feed/PostCard";
import { Stories } from "@/components/feed/Stories";

const mockPosts = [
  {
    id: "1",
    user: {
      name: "Carlos Silva",
      username: "carlossilva_10",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      isPremium: true,
      sport: "Futebol",
    },
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=800&fit=crop",
    caption: "Treino intenso hoje! 💪 Preparação para a próxima temporada. Foco e dedicação sempre! #futebol #treino #atleta",
    likes: 1234,
    comments: 89,
    timeAgo: "2h",
    isLiked: true,
  },
  {
    id: "2",
    user: {
      name: "Ana Santos",
      username: "ana_volei",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      isPremium: false,
      sport: "Vôlei",
    },
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&h=800&fit=crop",
    caption: "Campeonato estadual chegando! Quem vem torcer? 🏐",
    likes: 856,
    comments: 42,
    timeAgo: "5h",
    isLiked: false,
  },
  {
    id: "3",
    user: {
      name: "Pedro Oliveira",
      username: "pedro.basquete",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      isPremium: true,
      sport: "Basquete",
    },
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=800&fit=crop",
    caption: "Novo recorde pessoal! 🏀 32 pontos no jogo de ontem. Obrigado a todos pelo apoio!",
    likes: 2156,
    comments: 156,
    timeAgo: "8h",
    isLiked: true,
  },
];

const Feed = () => {
  return (
    <AppLayout>
      <div className="mx-auto max-w-xl py-6 px-4">
    

        {/* Posts */}
        <div className="mt-6 space-y-6">
          {mockPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Feed;
