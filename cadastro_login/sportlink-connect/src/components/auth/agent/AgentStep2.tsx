import React from 'react';
import { Building2, Users, GraduationCap, Briefcase, MapPin, Globe, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/auth/FormField';
import { SelectField } from '@/components/auth/SelectField';
import { FileUpload } from '@/components/auth/FileUpload';
import { Textarea } from '@/components/ui/textarea';
import { ESTADOS_BRASIL, TIPO_PERFIL_AGENTE } from '@/constants/form-options';
import type { AgentRegistrationData } from '@/types/auth.types';
import { cn } from '@/lib/utils';

interface AgentStep2Props {
  formData: AgentRegistrationData;
  errors: Partial<Record<keyof AgentRegistrationData, string>>;
  setFieldValue: (field: keyof AgentRegistrationData, value: any) => void;
  setFieldTouched: (field: keyof AgentRegistrationData) => void;
  onNext: () => void;
  onBack: () => void;
  validateForm: (fields?: (keyof AgentRegistrationData)[]) => boolean;
}

const profileTypeIcons: Record<string, React.ReactNode> = {
  empresario: <Briefcase className="w-5 h-5" />,
  agente: <Users className="w-5 h-5" />,
  clube: <Building2 className="w-5 h-5" />,
  escolinha: <GraduationCap className="w-5 h-5" />,
};

export const AgentStep2: React.FC<AgentStep2Props> = ({
  formData,
  errors,
  setFieldValue,
  setFieldTouched,
  onNext,
  onBack,
  validateForm,
}) => {
  const handleNext = () => {
    const isValid = validateForm([
      'tipo_perfil',
      'nome_publico',
      'cidade',
      'estado',
      'telefone_contato',
      'email_contato',
    ]);
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Perfil Profissional</h2>
        <p className="text-muted-foreground">Informações sobre sua atuação</p>
      </div>

      {/* Profile type selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          Tipo de perfil <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {TIPO_PERFIL_AGENTE.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setFieldValue('tipo_perfil', type.value as any)}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200",
                formData.tipo_perfil === type.value
                  ? "border-primary bg-primary/5 shadow-soft"
                  : "border-border hover:border-primary/50 bg-card"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                  formData.tipo_perfil === type.value
                    ? "[background:var(--gradient-accent)] text-accent-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {profileTypeIcons[type.value]}
              </div>
              <span
                className={cn(
                  "font-medium text-sm",
                  formData.tipo_perfil === type.value ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {type.label}
              </span>
            </button>
          ))}
        </div>
        {errors.tipo_perfil && (
          <p className="text-xs text-destructive">{errors.tipo_perfil}</p>
        )}
      </div>

      {/* Logo upload */}
      <div className="flex justify-center">
        <FileUpload
          variant="logo"
          label="Logo / Imagem de perfil"
          hint="Opcional - Recomendado 400x400px"
          accept="image/*"
          value={formData.logo}
          onChange={(file) => setFieldValue('logo', file)}
        />
      </div>

      <div className="space-y-4">
        <FormField
          label="Nome público / Razão social"
          type="text"
          placeholder="Nome que será exibido"
          value={formData.nome_publico}
          onChange={(e) => setFieldValue('nome_publico', e.target.value)}
          onBlur={() => setFieldTouched('nome_publico')}
          error={errors.nome_publico}
          required
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Descrição
          </label>
          <Textarea
            placeholder="Descreva sua atuação, especialidades e experiência..."
            value={formData.descricao || ''}
            onChange={(e) => setFieldValue('descricao', e.target.value)}
            className="min-h-[80px] rounded-xl border-2 bg-secondary/30 focus:border-primary focus:bg-background transition-all"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Cidade"
            type="text"
            placeholder="Sua cidade"
            value={formData.cidade}
            onChange={(e) => setFieldValue('cidade', e.target.value)}
            onBlur={() => setFieldTouched('cidade')}
            error={errors.cidade}
            icon={<MapPin className="w-5 h-5" />}
            required
          />

          <SelectField
            label="Estado"
            value={formData.estado}
            onChange={(value) => setFieldValue('estado', value)}
            options={ESTADOS_BRASIL}
            placeholder="Selecione"
            error={errors.estado}
            required
          />
        </div>

        <FormField
          label="Site"
          type="url"
          placeholder="https://seusite.com.br"
          value={formData.site || ''}
          onChange={(e) => setFieldValue('site', e.target.value)}
          icon={<Globe className="w-5 h-5" />}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Telefone de contato"
            type="tel"
            placeholder="(00) 00000-0000"
            value={formData.telefone_contato}
            onChange={(e) => setFieldValue('telefone_contato', e.target.value)}
            onBlur={() => setFieldTouched('telefone_contato')}
            error={errors.telefone_contato}
            icon={<Phone className="w-5 h-5" />}
            required
          />

          <FormField
            label="E-mail de contato"
            type="email"
            placeholder="contato@email.com"
            value={formData.email_contato}
            onChange={(e) => setFieldValue('email_contato', e.target.value)}
            onBlur={() => setFieldTouched('email_contato')}
            error={errors.email_contato}
            icon={<Mail className="w-5 h-5" />}
            required
          />
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <Button variant="outline" size="lg" onClick={onBack} className="flex-1">
          Voltar
        </Button>
        <Button variant="gradient" size="lg" onClick={handleNext} className="flex-1">
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default AgentStep2;
