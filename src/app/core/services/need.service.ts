import { Injectable } from '@angular/core';
import { Need } from '../models/need.model';

@Injectable({
  providedIn: 'root'
})
export class NeedService {
  private storageKey = 'clientNeeds';

  constructor() {
    // Inicializar con datos de LocalStorage si existen
    const savedNeeds = localStorage.getItem(this.storageKey);
    if (!savedNeeds) {
      this.setNeeds([]); // Inicializa un array vacío si no hay datos en LocalStorage
    }
  }

  // Obtener todas las necesidades desde LocalStorage
  getNeeds(): Need[] {
    const savedNeeds = localStorage.getItem(this.storageKey);
    return savedNeeds ? JSON.parse(savedNeeds) : [];
  }

  // Obtener una necesidad por ID
  getNeedById(id: number): Need | undefined {
    const needs = this.getNeeds();
    return needs.find(need => need.id === id);
  }

  // Agregar una nueva necesidad
  addNeed(need: Need): void {
    const needs = this.getNeeds();
    need.id = needs.length ? Math.max(...needs.map(n => n.id)) + 1 : 1; // Genera un nuevo ID único
    needs.push(need);
    this.setNeeds(needs);
  }

  // Actualizar LocalStorage
  private setNeeds(needs: Need[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(needs));
  }
}