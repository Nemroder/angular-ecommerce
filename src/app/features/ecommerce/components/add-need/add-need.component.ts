import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NeedService } from '../../../../core/services/need.service';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-need',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-need.component.html',
  styleUrl: './add-need.component.css'
})
export class AddNeedComponent {
  needForm: FormGroup;
  @Output() needAdded = new EventEmitter<void>(); // Emitir evento cuando se agregue una necesidad

  constructor(private fb: FormBuilder, private needService: NeedService) {
    this.needForm = this.fb.group({
      description: ['', Validators.required],
      priority: ['Baja', Validators.required],
      estimatedDate: ['', Validators.required],
      subNeeds: [[]]
    });
  }

  onSubmit() {
    if (this.needForm.valid) {
      this.needService.addNeed(this.needForm.value);
      this.needForm.reset();
      this.needAdded.emit(); // Notifica que una necesidad fue agregada
    }
  }
}
