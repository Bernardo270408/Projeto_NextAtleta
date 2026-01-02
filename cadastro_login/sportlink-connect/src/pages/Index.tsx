import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trophy, Building2, Users, ArrowRight, Zap, Shield, Globe } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center [background:var(--gradient-primary)]">
              <span className="text-lg font-bold text-primary-foreground">S</span>
            </div>
            <span className="text-xl font-bold text-foreground">
              Sport<span className="text-primary">Link</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Entrar</Button>
            </Link>
            <Link to="/cadastro">
              <Button variant="gradient" size="sm">Cadastrar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Zap className="w-4 h-4" />
            Conectando talentos ao sucesso
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
            Sua carreira no esporte{' '}
            <span className="text-primary">começa aqui</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            A plataforma que conecta atletas, clubes, empresários e agentes esportivos. 
            Mostre seu talento e encontre as melhores oportunidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/cadastro">
              <Button variant="gradient" size="xl" className="w-full sm:w-auto">
                Começar agora
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                Já tenho conta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Para todos do mundo esportivo
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Seja você atleta ou profissional do esporte, temos as ferramentas certas para você.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-card border border-border hover-lift">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center [background:var(--gradient-primary)] mb-5">
                <Trophy className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Atletas</h3>
              <p className="text-muted-foreground">
                Crie seu perfil esportivo, mostre suas habilidades e seja descoberto por clubes e empresários.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border hover-lift">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center [background:var(--gradient-accent)] mb-5">
                <Building2 className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Clubes & Escolinhas</h3>
              <p className="text-muted-foreground">
                Encontre talentos, gerencie sua equipe e divulgue oportunidades para novos atletas.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border hover-lift">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-success/20 mb-5">
                <Users className="w-7 h-7 text-success" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Agentes & Empresários</h3>
              <p className="text-muted-foreground">
                Descubra novos talentos, gerencie carreiras e conecte atletas às melhores oportunidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center [background:var(--gradient-primary)]">
              <span className="text-sm font-bold text-primary-foreground">S</span>
            </div>
            <span className="text-lg font-bold text-foreground">SportLink</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 SportLink. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
