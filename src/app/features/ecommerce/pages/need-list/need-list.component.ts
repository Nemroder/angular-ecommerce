import { Component, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Need } from '../../../../core/models/need.model';
import { NeedService } from '../../../../core/services/need.service';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AddNeedComponent } from '../../components/add-need/add-need.component';

@Component({
  selector: 'app-need-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, AddNeedComponent],
  templateUrl: './need-list.component.html',
  styleUrl: './need-list.component.css'
})
export default class NeedListComponent {
  needs: Need[] = [];

  constructor(private needService: NeedService) {}

  loadNeeds() {
    this.needs = this.needService.getNeeds();
    console.log('Needs after loading:', this.needs); // Verifica el contenido de las necesidades
  }
}