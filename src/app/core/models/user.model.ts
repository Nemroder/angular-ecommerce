export interface User {
    username: string;
    password: string;
    role: 'admin' | 'supervisor' | 'agente' | 'cliente';
    isActive: boolean;
  }  