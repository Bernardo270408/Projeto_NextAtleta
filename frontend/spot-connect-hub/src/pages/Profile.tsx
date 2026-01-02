import { AppLayout } from "@/components/layout/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Grid3X3,
  Bookmark,
  Trophy,
  MapPin,
  Calendar,
  Mail,
  Phone,
  MessageCircle,
  Settings,
  ChevronRight,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

const mockUser = {
  name: "Carlos Eduardo Silva",
  username: "carlossilva_10",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&h=400&fit=crop",
  bio: "⚽ Atacante | 22 anos | Sonhando alto, trabalhando duro\n🏆 Campeão estadual sub-20\n📍 São Paulo, SP",
  sport: "Futebol",
  position: "Atacante",
  location: "São Paulo, SP",
  birthDate: "15/03/2002",
  height: "1,82m",
  weight: "78kg",
  email: "carlos.silva@email.com",
  phone: "(11) 99999-9999",
  followers: 12500,
  following: 340,
  posts: 87,
  isPremium: true,
  isVerified: true,
};

const mockPosts = [
  { id: "1", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop" },
  { id: "2", image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&h=400&fit=crop" },
  { id: "3", image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=400&fit=crop" },
  { id: "4", image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop" },
  { id: "5", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop" },
  { id: "6", image: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=400&h=400&fit=crop" },
];

const mockCareer = [
  {
    club: "São Paulo FC",
    period: "2022 - Atual",
    category: "Sub-23",
    achievements: ["Campeão Estadual 2023", "Artilheiro do campeonato"],
  },
  {
    club: "Corinthians",
    period: "2019 - 2022",
    category: "Base",
    achievements: ["Vice-campeão Brasileiro Sub-17"],
  },
];

const Profile = () => {
  const isOwnProfile = true;

  return (
    <AppLayout>
      <div className="animate-fade-in">
        {/* Cover Image */}
        <div className="relative h-48 md:h-64 overflow-hidden bg-muted">
          <img
            src={mockUser.coverImage}
            alt="Capa"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        {/* Profile Header */}
        <div className="relative px-4 pb-6">
          {/* Avatar */}
          <div className="relative -mt-16 mb-4 flex justify-between items-end">
            <div className={mockUser.isPremium ? "story-ring rounded-full" : ""}>
              <div className="rounded-full border-4 border-background bg-background">
                <Avatar className="h-28 w-28 md:h-36 md:w-36">
                  <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                  <AvatarFallback className="text-2xl">{mockUser.name[0]}</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="flex gap-2">
              {isOwnProfile ? (
                <>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button variant="premium" size="sm">
                    <Star className="h-4 w-4 mr-2" />
                    Premium
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="gradient">Seguir</Button>
                  <Button variant="outline" size="icon">
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Name and Info */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold">{mockUser.name}</h1>
              {mockUser.isPremium && <span className="premium-badge">PRO</span>}
            </div>
            <p className="text-muted-foreground">@{mockUser.username}</p>
          </div>

          {/* Bio */}
          <p className="whitespace-pre-line mb-4 text-sm">{mockUser.bio}</p>

          {/* Quick Info */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              <span>{mockUser.sport} • {mockUser.position}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{mockUser.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>22 anos</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-around py-4 border-y border-border">
            <div className="text-center">
              <p className="text-xl font-bold">{mockUser.posts}</p>
              <p className="text-sm text-muted-foreground">publicações</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{(mockUser.followers / 1000).toFixed(1)}k</p>
              <p className="text-sm text-muted-foreground">seguidores</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{mockUser.following}</p>
              <p className="text-sm text-muted-foreground">seguindo</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="posts" className="px-4">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              <span className="hidden sm:inline">Publicações</span>
            </TabsTrigger>
            <TabsTrigger value="career" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Carreira</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">Salvos</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-0">
            <div className="grid grid-cols-3 gap-1">
              {mockPosts.map((post) => (
                <div
                  key={post.id}
                  className="relative aspect-square overflow-hidden bg-muted cursor-pointer group"
                >
                  <img
                    src={post.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors" />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="career" className="mt-0 space-y-4 pb-8">
            {/* Physical Info */}
            <div className="card-elevated p-4">
              <h3 className="font-semibold mb-3">Informações Físicas</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Altura</p>
                  <p className="font-medium">{mockUser.height}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Peso</p>
                  <p className="font-medium">{mockUser.weight}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Posição</p>
                  <p className="font-medium">{mockUser.position}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Idade</p>
                  <p className="font-medium">22 anos</p>
                </div>
              </div>
            </div>

            {/* Career History */}
            <div className="card-elevated p-4">
              <h3 className="font-semibold mb-4">Histórico Esportivo</h3>
              <div className="space-y-4">
                {mockCareer.map((item, i) => (
                  <div key={i} className="relative pl-4 pb-4 border-l-2 border-primary/30 last:pb-0">
                    <div className="absolute left-[-5px] top-0 h-2 w-2 rounded-full gradient-primary" />
                    <h4 className="font-semibold">{item.club}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.period} • {item.category}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.achievements.map((achievement, j) => (
                        <span
                          key={j}
                          className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs text-success"
                        >
                          <Trophy className="h-3 w-3" />
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="card-elevated p-4">
              <h3 className="font-semibold mb-3">Contato</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{mockUser.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{mockUser.phone}</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="mt-0">
            <div className="py-12 text-center text-muted-foreground">
              <Bookmark className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Publicações salvas aparecerão aqui</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Profile;
