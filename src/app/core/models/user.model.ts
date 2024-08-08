export interface User {
    username: string;
    password: string;
    role: 'Administrador' | 'Supervisor' | 'Agente' | 'Cliente';
    isActive: boolean;
  }  