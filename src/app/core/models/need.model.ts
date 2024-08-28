export interface Need {
    id: number;
    description: string;
    priority: 'Alta' | 'Media' | 'Baja';
    estimatedDate: Date;
    subNeeds?: Need[]; // Permite que una necesidad tenga sub-necesidades
  }  