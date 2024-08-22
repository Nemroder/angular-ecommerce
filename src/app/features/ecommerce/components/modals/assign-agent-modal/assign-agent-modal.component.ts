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
  @Output() assign = new EventEmitter<number>();

  selectedAgentId?: number;

  constructor(
    private userService: UserService) {}

  onAssign(): void {
    if (this.selectedAgentId) {
      this.userService.assignAgent(this.selectedAgentId, this.supervisorId);
      this.assign.emit(this.selectedAgentId);
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
