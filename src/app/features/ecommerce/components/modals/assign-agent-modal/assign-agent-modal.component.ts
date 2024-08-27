import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { User } from '../../../../../core/models/user.model';
import { UserService } from '../../../../../core/services/user.service';
@Component({
  selector: 'app-assign-agent-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-agent-modal.component.html',
  styleUrl: './assign-agent-modal.component.css'
})
export class AssignAgentModalComponent {
  @Input() supervisorId!: number;
  @Input() agents: User[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() assign = new EventEmitter<number[]>();

  selectedAgentIds: number[] = [];

  constructor(private userService: UserService) {}

  isSelected(agentId: number): boolean {
    return this.selectedAgentIds.includes(agentId);
  }

  onCheckboxChange(event: Event, agentId: number): void {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.selectedAgentIds.push(agentId);
    } else {
      this.selectedAgentIds = this.selectedAgentIds.filter(id => id !== agentId);
    }
  }

  onAssign(): void {
    if (this.selectedAgentIds.length > 0) {
      this.selectedAgentIds.forEach(agentId => {
        this.userService.assignAgent(agentId, this.supervisorId);
      });
      this.assign.emit(this.selectedAgentIds);
      this.closeModal();
    }
  }

  onClose(): void {
    this.close.emit();
  }

  closeModal(): void {
    this.close.emit();
  }
}