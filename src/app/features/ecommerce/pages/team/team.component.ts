import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user.model';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  agents: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadAgents();
  }

  loadAgents(): void {
    const loggedUser = this.userService.getLoggedUser();
    // console.log('Logged User:', loggedUser);

    if (loggedUser && loggedUser.role === 'supervisor') {
      const allUsers = this.userService.getUsers();
      // console.log('All Users:', allUsers);

      this.agents = allUsers.filter(user => user.supervisorId === loggedUser.id);
      // console.log('Agents:', this.agents);
    }
  }

  removeAgent(agentId: number): void {
    this.userService.unassignAgent(agentId);
    this.loadAgents();
  }
}