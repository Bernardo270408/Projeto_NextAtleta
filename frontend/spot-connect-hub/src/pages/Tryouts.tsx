import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Calendar,
  Users,
  ChevronRight,
  Trophy,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = ["Todas", "Futebol", "Vôlei", "Basquete", "Natação", "Atletismo"];

const mockTryouts = [
  {
    id: "1",
    title: "Peneira Flamengo Sub-20",
    club: "Flamengo",
    clubLogo: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=100&h=100&fit=crop",
    sport: "Futebol",
    category: "Sub-20",
    location: "Rio de Janeiro, RJ",
    date: "20/01/2025",
    time: "08:00",
    spots: 50,
    registered: 127,
    description: "Seletiva para jovens talentos. Traga documentação e atestado médico.",
    requirements: ["Idade: 17-19 anos", "Documentação completa", "Atestado médico"],
    isHot: true,
  },
  {
    id: "2",
    title: "Seletiva Osasco Vôlei",
    club: "Osasco Vôlei",
    clubLogo: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=100&h=100&fit=crop",
    sport: "Vôlei",
    category: "Adulto",
    location: "Osasco, SP",
    date: "25/01/2025",
    time: "14:00",
    spots: 30,
    registered: 45,
    description: "Seletiva para a equipe feminina adulta.",
    requirements: ["Idade: 18+ anos", "Experiência em competições"],
    isHot: false,
  },
  {
    id: "3",
    title: "Teste São Paulo FC Base",
    club: "São Paulo FC",
    clubLogo: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=100&h=100&fit=crop",
    sport: "Futebol",
    category: "Sub-17",
    location: "São Paulo, SP",
    date: "28/01/2025",
    time: "09:00",
    spots: 100,
    registered: 289,
    description: "Avaliação técnica para categorias de base.",
    requirements: ["Idade: 15-16 anos", "Autorização dos pais"],
    isHot: true,
  },
  {
    id: "4",
    title: "Seletiva Minas Tênis Basquete",
    club: "Minas Tênis Clube",
    clubLogo: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop",
    sport: "Basquete",
    category: "Sub-23",
    location: "Belo Horizonte, MG",
    date: "02/02/2025",
    time: "10:00",
    spots: 25,
    registered: 38,
    description: "Oportunidade para jogadores de basquete.",
    requirements: ["Altura mínima: 1,80m", "Experiência comprovada"],
    isHot: false,
  },
];

const Tryouts = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTryout, setSelectedTryout] = useState<string | null>(null);

  const filteredTryouts = mockTryouts.filter((tryout) => {
    const matchesCategory =
      selectedCategory === "Todas" || tryout.sport === selectedCategory;
    const matchesSearch =
      tryout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tryout.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tryout.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AppLayout>
      <div className="p-4 animate-fade-in">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Peneiras e Testes</h1>
          <p className="text-muted-foreground">
            Encontre oportunidades em clubes de todo o Brasil
          </p>
        </div>

        {/* Search */}
        <div className="sticky top-14 md:top-0 z-30 bg-background/95 backdrop-blur-lg pb-4 -mx-4 px-4">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Buscar peneiras..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 rounded-xl"
              />
            </div>
            <Button variant="outline" size="icon" className="h-12 w-12 shrink-0">
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "gradient" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="shrink-0"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <p className="text-sm text-muted-foreground mb-4">
          {filteredTryouts.length} oportunidades encontradas
        </p>

        {/* Tryouts List */}
        <div className="space-y-4">
          {filteredTryouts.map((tryout) => (
            <div
              key={tryout.id}
              className={cn(
                "card-elevated overflow-hidden transition-all",
                selectedTryout === tryout.id && "ring-2 ring-primary"
              )}
            >
              {/* Card Header */}
              <div
                className="p-4 cursor-pointer"
                onClick={() =>
                  setSelectedTryout(selectedTryout === tryout.id ? null : tryout.id)
                }
              >
                <div className="flex gap-4">
                  {/* Club Logo */}
                  <div className="shrink-0 h-16 w-16 rounded-xl overflow-hidden bg-muted">
                    <img
                      src={tryout.clubLogo}
                      alt={tryout.club}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold line-clamp-1">{tryout.title}</h3>
                      {tryout.isHot && (
                        <Badge variant="destructive" className="shrink-0 text-xs">
                          🔥 Alta demanda
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{tryout.club}</p>

                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                        <Trophy className="h-3 w-3" />
                        {tryout.sport}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {tryout.location}
                      </span>
                    </div>
                  </div>

                  <ChevronRight
                    className={cn(
                      "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                      selectedTryout === tryout.id && "rotate-90"
                    )}
                  />
                </div>
              </div>

              {/* Expanded Content */}
              {selectedTryout === tryout.id && (
                <div className="px-4 pb-4 animate-fade-in">
                  <div className="pt-4 border-t border-border">
                    {/* Date and Time */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{tryout.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{tryout.time}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4">
                      {tryout.description}
                    </p>

                    {/* Requirements */}
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Requisitos:</p>
                      <ul className="space-y-1">
                        {tryout.requirements.map((req, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground flex items-center gap-2"
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Spots */}
                    <div className="flex items-center gap-2 text-sm mb-4">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>
                        <span className="font-medium">{tryout.registered}</span>{" "}
                        inscritos de{" "}
                        <span className="font-medium">{tryout.spots}</span> vagas
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 rounded-full bg-muted mb-4 overflow-hidden">
                      <div
                        className="h-full gradient-primary transition-all"
                        style={{
                          width: `${Math.min(
                            (tryout.registered / tryout.spots) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button variant="gradient" className="flex-1">
                        Tenho interesse
                      </Button>
                      <Button variant="outline">Salvar</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Tryouts;
