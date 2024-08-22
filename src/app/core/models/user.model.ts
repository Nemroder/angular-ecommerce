export interface User {
    id: number;
    username: string;
    password: string;
    role: 'admin' | 'supervisor' | 'agente' | 'cliente';
    isActive: boolean;
    supervisorId?: number;
  }  