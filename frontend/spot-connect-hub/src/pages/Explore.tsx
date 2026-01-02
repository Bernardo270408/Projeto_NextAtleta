import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, SlidersHorizontal, MapPin, Trophy, Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const sports = [
  "Todos",
  "Futebol",
  "Vôlei",
  "Basquete",
  "Natação",
  "Atletismo",
  "Tênis",
  "Judô",
];

const mockAthletes = [
  {
    id: "1",
    name: "Carlos Silva",
    username: "carlossilva_10",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    sport: "Futebol",
    position: "Atacante",
    location: "São Paulo, SP",
    age: 22,
    isPremium: true,
    followers: 12500,
  },
  {
    id: "2",
    name: "Ana Santos",
    username: "ana_volei",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    sport: "Vôlei",
    position: "Levantadora",
    location: "Rio de Janeiro, RJ",
    age: 20,
    isPremium: false,
    followers: 8900,
  },
  {
    id: "3",
    name: "Pedro Oliveira",
    username: "pedro.basquete",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
    sport: "Basquete",
    position: "Ala-armador",
    location: "Belo Horizonte, MG",
    age: 24,
    isPremium: true,
    followers: 15200,
  },
  {
    id: "4",
    name: "Julia Costa",
    username: "julia_natacao",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    sport: "Natação",
    position: "100m Livre",
    location: "Curitiba, PR",
    age: 19,
    isPremium: false,
    followers: 6700,
  },
  {
    id: "5",
    name: "Lucas Mendes",
    username: "lucas_atletismo",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    sport: "Atletismo",
    position: "100m Rasos",
    location: "Brasília, DF",
    age: 23,
    isPremium: true,
    followers: 11300,
  },
  {
    id: "6",
    name: "Fernanda Lima",
    username: "fer_tenis",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop",
    sport: "Tênis",
    position: "Singles",
    location: "Porto Alegre, RS",
    age: 21,
    isPremium: false,
    followers: 9400,
  },
];

const Explore = () => {
  const [selectedSport, setSelectedSport] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAthletes = mockAthletes.filter((athlete) => {
    const matchesSport = selectedSport === "Todos" || athlete.sport === selectedSport;
    const matchesSearch =
      athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      athlete.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      athlete.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSport && matchesSearch;
  });

  return (
    <AppLayout>
      <div className="p-4 animate-fade-in">
        {/* Search Header */}
        <div className="sticky top-14 md:top-0 z-30 bg-background/95 backdrop-blur-lg pb-4 -mx-4 px-4 pt-2">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Buscar atletas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 rounded-xl"
              />
            </div>
            <Button variant="outline" size="icon" className="h-12 w-12 shrink-0">
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>

          {/* Sport Filters */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
            {sports.map((sport) => (
              <Button
                key={sport}
                variant={selectedSport === sport ? "gradient" : "outline"}
                size="sm"
                onClick={() => setSelectedSport(sport)}
                className="shrink-0"
              >
                {sport}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-4">
          {filteredAthletes.length} atletas encontrados
        </p>

        {/* Athletes Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAthletes.map((athlete) => (
            <Link
              key={athlete.id}
              to={`/profile/${athlete.id}`}
              className="card-elevated p-4 flex gap-4 group"
            >
              <div className={cn(
                "shrink-0 rounded-full p-[2px]",
                athlete.isPremium ? "gradient-premium" : "bg-border"
              )}>
                <Avatar className="h-16 w-16 border-2 border-card">
                  <AvatarImage src={athlete.avatar} alt={athlete.name} />
                  <AvatarFallback>{athlete.name[0]}</AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                    {athlete.name}
                  </h3>
                  {athlete.isPremium && (
                    <Star className="h-4 w-4 text-premium shrink-0" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  @{athlete.username}
                </p>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                    <Trophy className="h-3 w-3" />
                    {athlete.sport}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {athlete.location}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground mt-2">
                  {(athlete.followers / 1000).toFixed(1)}k seguidores
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Explore;
