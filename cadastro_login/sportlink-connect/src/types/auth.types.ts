// User Types
export type UserType = 'atleta' | 'empresario' | 'agente' | 'clube' | 'escolinha';
export type UserStatus = 'ativo' | 'inativo' | 'suspenso' | 'pendente';
export type DocumentType = 'cpf' | 'cnpj';
export type DocumentStatus = 'pendente' | 'aprovado' | 'rejeitado';
export type AthleteLevel = 'iniciante' | 'intermediario' | 'avancado' | 'profissional';
export type AthleteSituation = 'base' | 'amador' | 'profissional';
export type DominantFoot = 'direito' | 'esquerdo' | 'ambos';
export type DominantHand = 'direito' | 'esquerdo' | 'ambos';
export type Gender = 'masculino' | 'feminino' | 'outro';

// Base User Interface
export interface Usuario {
  id?: string;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  foto_perfil?: string;
  tipo_usuario: UserType;
  status: UserStatus;
  email_verificado: boolean;
  created_at?: string;
  updated_at?: string;
}

// Athlete Profile
export interface PerfilAtleta {
  id?: string;
  usuario_id: string;
  data_nascimento: string;
  cidade: string;
  estado: string;
  altura_cm: number;
  peso_kg: number;
  sexo: Gender;
  disponivel_oportunidades: boolean;
  esporte: string;
  posicao: string;
  categoria: string;
  pe_dominante: DominantFoot;
  mao_dominante?: DominantHand;
  nivel_tecnico: AthleteLevel;
  situacao: AthleteSituation;
  bio?: string;
  created_at?: string;
  updated_at?: string;
}

// Agent Profile (Empresário, Agente, Clube, Escolinha)
export interface PerfilEsportivo {
  id?: string;
  usuario_id: string;
  tipo_perfil: Exclude<UserType, 'atleta'>;
  nome_publico: string;
  descricao?: string;
  cidade: string;
  estado: string;
  site?: string;
  telefone_contato: string;
  email_contato: string;
  logo?: string;
  created_at?: string;
  updated_at?: string;
}

// Document for verification
export interface DocumentoVerificacao {
  id?: string;
  perfil_esportivo_id: string;
  tipo_documento: DocumentType;
  numero_documento: string;
  arquivo_url?: string;
  status: DocumentStatus;
  validado: boolean;
  created_at?: string;
  updated_at?: string;
}

// Registration Form Data
export interface AthleteRegistrationData {
  // Step 1 - Basic Info
  nome: string;
  email: string;
  senha: string;
  confirmar_senha: string;
  telefone: string;
  foto_perfil?: File;
  
  // Step 2 - Personal Data
  data_nascimento: string;
  cidade: string;
  estado: string;
  altura_cm: number;
  peso_kg: number;
  sexo: Gender;
  arquivo_documento_frente?: File | undefined;
  arquivo_documento_verso?: File | undefined;
  arquivo_documento_unico?: File | undefined;
  disponivel_oportunidades: boolean;
  
  // Step 3 - Sport Profile
  esporte: string;
  posicao: string;
  categoria: string;
  pe_dominante: DominantFoot;
  mao_dominante?: DominantHand;
  nivel_tecnico: AthleteLevel;
  situacao: AthleteSituation;
  bio?: string;
}

export interface AgentRegistrationData {
  // Step 1 - Basic Info
  nome: string;
  email: string;
  senha: string;
  confirmar_senha: string;
  telefone: string;
  foto_perfil?: File;
  
  // Step 2 - Profile Info
  tipo_perfil: Exclude<UserType, 'atleta'>;
  nome_publico: string;
  descricao?: string;
  cidade: string;
  estado: string;
  site?: string;
  telefone_contato: string;
  email_contato: string;
  logo?: File;
  
  // Step 3 - Documentation
  tipo_documento: DocumentType;
  numero_documento: string;
  arquivo_documento?: File;
}

export interface LoginData {
  email: string;
  senha: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: Usuario;
    token: string;
  };
  error?: string;
}
